import * as dotenv from "dotenv";

dotenv.config();

const config = {
  aws: {
    account_id: process.env.AWS_ACCOUNT_ID || "",
    region: {
      az1: process.env.AWS_REGION_AZ1 || "",
    },
  },
  app_repo: {
    owner: "JBongars",
    name: "nextjs-template",
    url: process.env.APP_REPO_URL || "",
  },
  infra_repo: {
    owner: "JBongars",
    name: "aws-cdk-nextjs-bootstrap",
    url: process.env.INFRA_REPO_URL || "",
  },
};

export default config;
