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
            // depsLockFilePath: 'bun.lock',
            // depsLockFilePath: 'yarn.lock',
            functionName: 'try-hono-func',
            memorySize: 256,
            depsLockFilePath: 'package-lock.json',
            entry: 'src/index.ts',
            handler: 'handler',
            runtime: lambda.Runtime.NODEJS_18_X,
            environment: {
                PRISMA_CLI_BINARY_TARGETS: "native,rhel-openssl-1.0.x",
                DATABASE_URL: process.env.DATABASE_URL || '',
            },
            bundling: {
                externalModules: ['aws-sdk'],
                nodeModules: ['prisma', '@prisma/client', 'hono', 'xlsx'],
                commandHooks: {
                    beforeBundling: () => [],
                    beforeInstall: () => [],
                    afterBundling: (i: string, o: string) => [
                        `cp -R ${i}/prisma ${o}`,
                        `cp -R ${i}/.env ${o}`,
                        `npx prisma generate`,
                    ]
                }
            }
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