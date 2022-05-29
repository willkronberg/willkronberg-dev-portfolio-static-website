import * as CodeBuild from 'aws-cdk-lib/aws-codebuild';
import * as CodePipeline from 'aws-cdk-lib/aws-codepipeline';
import * as CodePipelineAction from 'aws-cdk-lib/aws-codepipeline-actions';
import { App, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { StaticWebsite } from '../constructs/static_website';

export interface PipelineProps extends StackProps {
  github: {
    owner: string;
    repository: string;
  };
}

export class Pipeline extends Stack {
  constructor(scope: App, id: string, props: PipelineProps) {
    super(scope, id, props);

    const staticWebsite = new StaticWebsite(this, 'StaticWebsite', {
      accountId: this.account,
      domainName: 'willkronberg.dev',
    });

    // AWS CodeBuild artifacts
    const outputSources = new CodePipeline.Artifact();
    const outputWebsite = new CodePipeline.Artifact();

    // AWS CodePipeline pipeline
    const pipeline = new CodePipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'Website',
      restartExecutionOnUpdate: true,
    });

    // AWS CodePipeline stage to clone sources from GitHub repository
    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new CodePipelineAction.GitHubSourceAction({
          actionName: 'Checkout',
          owner: props.github.owner,
          repo: props.github.repository,
          oauthToken: SecretValue.secretsManager('GitHubToken'),
          output: outputSources,
          trigger: CodePipelineAction.GitHubTrigger.WEBHOOK,
        }),
      ],
    });

    // AWS CodePipeline stage to build CRA website and CDK resources
    pipeline.addStage({
      stageName: 'Build',
      actions: [
        // AWS CodePipeline action to run CodeBuild project
        new CodePipelineAction.CodeBuildAction({
          actionName: 'Website',
          project: new CodeBuild.PipelineProject(this, 'BuildWebsite', {
            projectName: 'Website',
            buildSpec: CodeBuild.BuildSpec.fromSourceFilename('./infrastructure/buildspec.yml'),
          }),
          input: outputSources,
          outputs: [outputWebsite],
        }),
      ],
    });

    // AWS CodePipeline stage to deploy the CRA website and CDK resources
    pipeline.addStage({
      stageName: 'Deploy',
      actions: [
        // AWS CodePipeline action to deploy CRA website to S3
        new CodePipelineAction.S3DeployAction({
          actionName: 'Website',
          input: outputWebsite,
          bucket: staticWebsite.deploymentBucket,
          runOrder: 1,
        }),
        // Invalidate Cache
        new CodePipelineAction.CodeBuildAction({
          actionName: 'InvalidateCache',
          project: staticWebsite.cloudfrontDistro.invalidateProject,
          input: outputWebsite,
          runOrder: 2,
        }),

        // new CodePipelineAction.LambdaInvokeAction({
        //   actionName: 'InvalidateCacheAsync',
        //   lambda: '',
        //   input: outputWebsite,
        //   runOrder: 2,
        // }),
      ],
    });
  }
}
