import { App } from 'aws-cdk-lib'
import { FunctionStack, type FunctionProps } from '@thunderso/cdk-functions'

const fnStackProps: FunctionProps = {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    },
    application: 'hono',
    service: 'lambda',
    environment: 'dev',

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