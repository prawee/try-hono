import { Hono } from 'hono'

const home = new Hono()

home.get('/', (c) => {
  return c.text('Hello Hono! on AWS Lambda')
})

home.post('/', c => c.json({
  message: 'successfully (POST)'
}))

home.put('/', c => c.json({
  message: 'successfully (PUT)'
}))

home.patch('/', c => c.json({
  message: 'successfully (PATCH)'
}))

home.delete('/', c => c.json({
  message: 'successfully (DELETE)'
}))

export { home }