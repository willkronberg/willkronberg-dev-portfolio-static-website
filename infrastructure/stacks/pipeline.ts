/* eslint-disable no-new */
import * as CDK from '@aws-cdk/core';
import * as CodeBuild from '@aws-cdk/aws-codebuild';
import * as S3 from '@aws-cdk/aws-s3';
import * as CodePipeline from '@aws-cdk/aws-codepipeline';
import * as CodePipelineAction from '@aws-cdk/aws-codepipeline-actions';
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as targets from '@aws-cdk/aws-route53-targets/lib';

export interface PipelineProps extends CDK.StackProps {
  github: {
    owner: string;
    repository: string;
  };
}

export class Pipeline extends CDK.Stack {
  constructor(scope: CDK.App, id: string, props: PipelineProps) {
    super(scope, id, props);

    // Amazon S3 bucket to store CRA website
    const bucketWebsite = new S3.Bucket(this, 'Files', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
    });

    // Route 53 Information
    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: 'willkronberg.dev' });
    const siteDomain = 'willkronberg.dev';

    // TLS certificate
    const { certificateArn } = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: siteDomain,
      hostedZone: zone,
    });

    new CDK.CfnOutput(this, 'Certificate', { value: certificateArn });

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [siteDomain],
        sslMethod: cloudfront.SSLMethod.SNI,
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucketWebsite,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    new CDK.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: siteDomain,
      target: route53.AddressRecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone,
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
          oauthToken: CDK.SecretValue.secretsManager('GitHubToken'),
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
          bucket: bucketWebsite,
        }),
      ],
    });

    new CDK.CfnOutput(this, 'BucketWebsiteURL', {
      value: bucketWebsite.bucketWebsiteUrl,
      description: 'Website URL',
    });
  }
}
