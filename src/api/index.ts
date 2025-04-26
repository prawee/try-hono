import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use("*", logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/json', c => c.json({
  message: 'successfully'
}))

export { app }