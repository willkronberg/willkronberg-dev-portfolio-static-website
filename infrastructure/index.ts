import * as cdk from '@aws-cdk/core';
import { Pipeline } from './stacks/pipeline';

const app = new cdk.App();

const config = {
  github: {
    owner: 'willkronberg',
    repository: 'cra-pipeline',
  },
  env: { region: 'us-west-2' },
};

// eslint-disable-next-line no-new
new Pipeline(app, 'Pipeline', config);

app.synth();
