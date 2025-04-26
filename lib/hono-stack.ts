import * as cdk from 'aws-cdk-lib'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

export class HonoStack extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,
        props?: cdk.StackProps
    ) {
        super(scope, id, props);

        const fn = new NodejsFunction(this, 'lambda', {
            depsLockFilePath: 'bun.lock',
            entry: 'src/index.ts',
            handler: 'handler',
            runtime: lambda.Runtime.NODEJS_20_X
        })

        const apiGw = new apigw.LambdaRestApi(this, 'try-hono-api', {
            handler: fn
        })

        new cdk.CfnOutput(this, 'ApiEndpoint', {
            value: apiGw.url,
            description: "API Gateway endpoint URL"
        })

    }
}