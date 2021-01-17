#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsGrandexchangeInfraStack } from '../lib/aws-grandexchange-infra-stack';

const account = process.env.CDK_DEPLOY_ACCOUNT;
const region = process.env.CDK_DEPLOY_REGION;

const app = new cdk.App();
new AwsGrandexchangeInfraStack(app, 'AwsGrandexchangeInfraStack', {
  env: {
    account: account,
    region: region
  }
});
