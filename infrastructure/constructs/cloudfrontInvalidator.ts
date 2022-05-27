import { Construct } from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as iam from '@aws-cdk/aws-iam';
import { IDistribution } from '@aws-cdk/aws-cloudfront';
import { IBucket } from '@aws-cdk/aws-s3';
import { PipelineProject } from '@aws-cdk/aws-codebuild';

interface CloudfrontInvalidatorProps {
  accountId: string;
  distribution: IDistribution;
  deploymentBucket: IBucket;
}

export class CloudfrontInvalidator extends Construct {
  public readonly invalidateProject: PipelineProject;

  constructor(scope: Construct, id: string, props: CloudfrontInvalidatorProps) {
    super(scope, id);

    this.invalidateProject = new codebuild.PipelineProject(this, `InvalidateProject`, {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: ['aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"'],
          },
        },
      }),
      environmentVariables: {
        CLOUDFRONT_ID: { value: props.distribution.distributionId },
      },
    });

    // Add Cloudfront invalidation permissions to the project
    this.invalidateProject.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [`arn:aws:cloudfront::${props.accountId}:distribution/${props.distribution.distributionId}`],
        actions: ['cloudfront:CreateInvalidation'],
      })
    );
  }
}
