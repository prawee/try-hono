import { Hono } from 'hono'

const excel = new Hono()

excel.get('/', (c) => {
  return c.text('Hello Hono! on AWS Lambda')
})

export { excel }