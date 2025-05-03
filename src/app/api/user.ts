import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const user = new Hono()
const prisma = new PrismaClient()

user.get('/', async (c) => {
    const users = await prisma.user.findMany()
    return c.json({
        message: 'ok',
        data: users
    })
})

export { user }