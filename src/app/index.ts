import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { home } from './api/home'
import { user } from './api/user'
import { excel } from './api/excel'

const app = new Hono()

app.use("*", logger())

app.route('/', home)
app.route('/user', user)
app.route('/excel', excel)

export default app