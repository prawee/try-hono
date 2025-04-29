# Hono

```
bun create hono@latest hono-func
create-hono version 0.18.0
✔ Using target directory … hono-func
✔ Which template do you want to use? nodejs
✔ Do you want to install project dependencies? No
✔ Cloning the template
```


```
cd hono-func
cp env.dist .env
```

```
bun install
bun install -D @types/node
bun run dev
```

```
bun run build
bun run start
```

```bash
bun run build:image
```

```
bun add aws-cdk-lib constructs
bun add -D @types/node aws-cdk ts-node
```

```
open http://localhost:3000
```

```
Started development server: http://localhost:3000
<-- GET /
--> GET / 200 1ms
<-- POST /
--> POST / 200 1ms
<-- PUT /
--> PUT / 200 1ms
<-- PATCH /
--> PATCH / 200 0ms
<-- DELETE /
--> DELETE / 200 0ms
```

```bash
HTTP/1.1 200 OK
content-type: text/plain;charset=utf-8
Date: Sat, 26 Apr 2025 18:05:55 GMT
Content-Length: 25

Hello Hono! on AWS Lambda
```

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 26 Apr 2025 18:06:29 GMT
Content-Length: 45

{
  "message": "create data successfully (POST)"
}
```

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 26 Apr 2025 18:06:49 GMT
Content-Length: 45

{
  "message": "replace data successfully (PUT)"
}
```

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 26 Apr 2025 18:07:03 GMT
Content-Length: 46

{
  "message": "update data successfully (PATCH)"
}
```

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sat, 26 Apr 2025 18:07:21 GMT
Content-Length: 47

{
  "message": "delete data successfully (DELETE)"
}
```