import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { home } from './api/home'
import { user } from './api/user'

const app = new Hono()

app.use("*", logger())

app.route('/', home)
app.route('/user', user)

export default app