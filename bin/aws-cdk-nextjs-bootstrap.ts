#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsCdkPipelineStack } from "../lib/aws-cdk-pipeline-stack";
import config from "../config";
import { NextJsAppStack } from "../lib/nextjs-app-stack";

const app = new cdk.App();

new AwsCdkPipelineStack(app, "AppBootstrapStack", {
  env: {
    account: config.aws.account_id,
    region: config.aws.region.az1,
  },
});

new NextJsAppStack(app, "AppNextJsAppStack", {
  env: {
    account: config.aws.account_id,
    region: config.aws.region.az1,
  },
});

app.synth();
