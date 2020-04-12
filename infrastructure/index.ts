import * as cdk from '@aws-cdk/core';
import { Pipeline } from './stacks/pipeline';

const app = new cdk.App();

const config = {
  github: {
    owner: 'willkronberg',
    repository: 'willkronberg-dev-portfolio-static-website',
  },
  env: { account: 'aws_account_number', region: 'us-east-1' },
};

// eslint-disable-next-line no-new
new Pipeline(app, 'Pipeline', config);

app.synth();
