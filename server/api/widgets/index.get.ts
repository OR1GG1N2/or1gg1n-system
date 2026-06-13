import { eq } from 'drizzle-orm'
import { widgets } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const db = event.context.db
  const session = await getUserSession(event)
  
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'Не авторизован' })
  }

  return await db.select().from(widgets).where(eq(widgets.userId, session.user.id))
})