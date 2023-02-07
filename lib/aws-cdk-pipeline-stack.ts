import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import config from "../config";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, "Pipeline", {
      pipelineName: "AWS-CDK-Pipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.connection(
          `${config.infra_repo.owner}/${config.infra_repo.name}`,
          "main",
          {
            connectionArn: config.aws.github_connection_arn,
          }
        ),
        commands: ["yarn", "yarn build", "npx cdk synth"],
      }),
    });
  }
}
