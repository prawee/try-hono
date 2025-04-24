import { App } from 'aws-cdk-lib'
import { FunctionStack, type FunctionProps } from '@thunderso/cdk-functions'

const fnStackProps: FunctionProps = {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT ? process.env.CDK_DEFAULT_ACCOUNT : '195608676464',
        region: process.env.CDK_DEFAULT_REGION ? process.env.CDK_DEFAULT_REGION : 'ap-southeast-1',
    },
    application: 'hono',
    service: 'lambda',
    environment: 'default',

    functionProps: {
        codeDir: 'dist',
        handler: 'index.handler',
    }
}

new FunctionStack(
    new App(), 
    `${fnStackProps.application}-${fnStackProps.service}-${fnStackProps.environment}-stack`, 
    fnStackProps
)