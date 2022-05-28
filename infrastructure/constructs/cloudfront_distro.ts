import { CfnOutput } from 'aws-cdk-lib';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CloudFrontWebDistribution, SSLMethod, SecurityPolicyProtocol } from 'aws-cdk-lib/aws-cloudfront';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { BuildSpec, PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';

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
      viewerCertificate: {
        aliases: [props.domainName],
        props: {
          acmCertificateArn: props.sslCertificate.certificateArn,
          sslSupportMethod: SSLMethod.SNI,
          minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
        },
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.deploymentBucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 10,
        },
        {
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
          errorCachingMinTtl: 10,
        },
      ],
    });

    this.invalidateProject = new PipelineProject(this, 'InvalidateProject', {
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            // eslint-disable-next-line no-template-curly-in-string
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

export default CloudfrontDistro;
