import * as cdk from "aws-cdk-lib";
import * as codeBuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";
import { config } from "dotenv";

export class NextJsAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new codeBuild.Project(this, "MyProject", {
      buildSpec: codeBuild.BuildSpec.fromObject({
        version: "0.1",
        phases: {
          build: {
            commands: ['echo "Hello, CodeBuild!"'],
          },
        },
      }),
    });
  }
}
