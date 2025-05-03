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
            depsLockFilePath: 'package-lock.json',
            entry: 'src/index.ts',
            handler: 'handler',
            runtime: lambda.Runtime.NODEJS_18_X,
            // environment: {
            //     PRISMA_CLI_BINARY_TARGETS: "native,rhel-openssl-1.0.x"
            // },
            bundling: {
                externalModules: ['aws-sdk'],
                nodeModules: ['prisma', '@prisma/client', 'hono'],
                commandHooks: {
                    beforeBundling: (i: string, o: string) => [],
                    beforeInstall: (i: string, o: string) => {
                        console.log(`afterBundling(i) `, i)
                        console.log(`afterBundling(0) `, o)
                        return [
                            // `npx prisma generate` 
                        ]
                    },
                    afterBundling: (i: string, o: string) => {
                        console.log(`afterBundling(i) `, i)
                        console.log(`afterBundling(0) `, o)
                        return [
                            `dir ${i}`,
                            `cd ${i}/node_modules/.prisma && dir`,
                            `copy ${i}/node_modules/.prisma/libquery_engine-rhel-openssl-1.0.x.so.node ${o}`,
                            // `copy ${i}/node_modules/.prisma/schema.prisma ${o}/`,
                            // `cd ${o}`,
                            // `npx prisma generate`,
                            // `copy ${i}/node_modules/.prisma/client/schema.prisma ${o}`,
                            // `cat schema.prisma`,
                            // `copy -R ${i}/prisma ${o}`,
                            // `copy -R ${i}/node_modules ${o}`,
                            // `cd ${o}`,
                            // `npx prisma generate`,
                            // `copy ${i}/node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node ${o}`,
                            // `copy ${i}/prisma/schema.prisma ${o}`,
                            // `copy ${i}/node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node ${o}/`
                            // `copy -R ${i}/prisma ${o}/xyz/`
                        ]
                    }
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