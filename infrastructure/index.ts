import * as cdk from '@aws-cdk/core';
import { Pipeline } from './stacks/pipeline';

const app = new cdk.App();

const config = {
  github: {
    owner: 'willkronberg',
    repository: 'nonprofit-outreach-manager-static-website',
  },
  env: { account: '#####', region: 'us-east-1' },
};

// eslint-disable-next-line no-new
new Pipeline(app, 'Pipeline', config);

app.synth();
