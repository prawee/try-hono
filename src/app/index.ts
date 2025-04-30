import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { home } from './api/home'

const app = new Hono()

app.use("*", logger())

app.route('/', home)

export default app