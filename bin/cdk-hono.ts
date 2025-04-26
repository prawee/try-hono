import * as cdk from 'aws-cdk-lib'
import { HonoStack } from '../lib/hono-stack'

const app = new cdk.App();
new HonoStack(app, 'HonoStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT ? process.env.CDK_DEFAULT_ACCOUNT : '',
        region: process.env.CDK_DEFAULT_REGION ? process.env.CDK_DEFAULT_REGION : 'ap-southeast-1'
    }
});