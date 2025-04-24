# CDK Functions

```
bun install -D aws-cdk-lib@2.150.0 @thunderso/cdk-functions
bun install dotenv ts-node
```

```
mkdir stack
cd stack
touch index.ts
```

```
npx cdk bootstrap aws://{{account}}/{{region}}
npx cdk deploy --require-approval never --all --app="npx tsx stack/index.ts" 
```