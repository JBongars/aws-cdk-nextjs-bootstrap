import * as cdk from "aws-cdk-lib";
import * as codeBuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";
import config from "../config";

export class NextJsAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new codeBuild.Project(this, "TestBuilder", {
      projectName: "TestBuilder",
      buildSpec: codeBuild.BuildSpec.fromObject({
        version: "0.1",
        phases: {
          build: {
            commands: ["echo Hello world!"],
          },
        },
      }),
    });

    new codeBuild.Project(this, "AppBuilder", {
      projectName: "AppBuilder",
      source: codeBuild.Source.gitHub({
        owner: config.app_repo.owner,
        repo: config.app_repo.name,
        webhook: true,
        webhookTriggersBatchBuild: true,
        webhookFilters: [
          codeBuild.FilterGroup.inEventOf(
            codeBuild.EventAction.PUSH
          ).andBranchIs("master"),
        ],
      }),
      buildSpec: codeBuild.BuildSpec.fromObject({
        version: "0.1",
        phases: {
          build: {
            commands: [
              "yarn install --prefer-offline --frozen-lockfile --non-interactive --production=false",
              "yarn build",
            ],
          },
        },
      }),
    });
  }
}
