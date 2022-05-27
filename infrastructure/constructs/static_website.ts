import { CfnOutput, Construct } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { ARecord, HostedZone, IHostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager';
import { CloudfrontDistro } from './cloudfront_distro';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';

interface StaticWebsiteProps {
  accountId: string;
  domainName: string;
}

export class StaticWebsite extends Construct {
  public readonly hostedZone: IHostedZone;
  public readonly sslCertificate: DnsValidatedCertificate;
  public readonly deploymentBucket: Bucket;
  public readonly cloudfrontDistro: CloudfrontDistro;

  constructor(scope: Construct, id: string, props: StaticWebsiteProps) {
    super(scope, id);

    // Hosted Zone
    this.hostedZone = HostedZone.fromLookup(this, 'StaticWebsiteHostedZone', { domainName: props.domainName });

    // SSL Certificate
    this.sslCertificate = new DnsValidatedCertificate(this, 'SSLCertificate', {
      domainName: props.domainName,
      hostedZone: this.hostedZone,
    });

    // Amazon S3 bucket to hold Static Website files.
    this.deploymentBucket = new Bucket(this, 'DeploymentBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
    });

    // Cloudfront Distribution
    this.cloudfrontDistro = new CloudfrontDistro(this, "CloudfrontDistro", {
      accountId: props.accountId,
      deploymentBucket: this.deploymentBucket,
      domainName: props.domainName,
      sslCertificate: this.sslCertificate,
    })

    // Route53 alias record for the CloudFront distribution
    new ARecord(this, 'SiteAliasRecord', {
      recordName: props.domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.cloudfrontDistro.distribution)),
      zone: this.hostedZone,
    });


    new CfnOutput(this, 'CertificateArn', { value: this.sslCertificate.certificateArn });
  }
}
