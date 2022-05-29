import { App } from 'aws-cdk-lib';
import { Pipeline } from './stacks/pipeline';

const app = new App();

const config = {
  github: {
    owner: 'willkronberg',
    repository: 'willkronberg-dev-portfolio-static-website',
  },
  env: { account: '406037948983', region: 'us-east-1' },
};

new Pipeline(app, 'Pipeline', config);

app.synth();
