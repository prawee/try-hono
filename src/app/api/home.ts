import { Hono } from 'hono'

const home = new Hono()

home.get('/', (c) => {
  return c.text('Hello Hono! on AWS Lambda')
})

home.post('/', c => c.json({
  message: 'create data successfully (POST)'
}))

home.put('/', c => c.json({
  message: 'replace data successfully (PUT)'
}))

home.patch('/', c => c.json({
  message: 'update data successfully (PATCH)'
}))

home.delete('/', c => c.json({
  message: 'delete data successfully (DELETE)'
}))

export { home }