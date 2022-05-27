import { CfnOutput, Construct } from '@aws-cdk/core';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { CloudFrontWebDistribution, SSLMethod, SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { IBucket } from '@aws-cdk/aws-s3';
import { BuildSpec, PipelineProject } from '@aws-cdk/aws-codebuild';

interface CloudfrontDistroProps {
  accountId: string;
  domainName: string;
  sslCertificate: ICertificate;
  deploymentBucket: IBucket;
}

export class CloudfrontDistro extends Construct {
  public readonly distribution: CloudFrontWebDistribution;
  public readonly invalidateProject: PipelineProject;

  constructor(scope: Construct, id: string, props: CloudfrontDistroProps) {
    super(scope, id);

    this.distribution = new CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: props.sslCertificate.certificateArn,
        names: [props.domainName],
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.deploymentBucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    this.invalidateProject = new PipelineProject(this, `InvalidateProject`, {
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: ['aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"'],
          },
        },
      }),
      environmentVariables: {
        CLOUDFRONT_ID: { value: this.distribution.distributionId },
      },
    });

    // Add Cloudfront invalidation permissions to the project
    this.invalidateProject.addToRolePolicy(
      new PolicyStatement({
        resources: [`arn:aws:cloudfront::${props.accountId}:distribution/${this.distribution.distributionId}`],
        actions: ['cloudfront:CreateInvalidation'],
      })
    );

    new CfnOutput(this, 'DistributionId', { value: this.distribution.distributionId });
  }
}
