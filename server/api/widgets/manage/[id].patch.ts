import { and, eq } from 'drizzle-orm'
import { widgets } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const db = event.context.db
  const session = await getUserSession(event)
  const id = getRouterParam(event, 'id')

  if (!session?.user?.id || !id) {
    throw createError({ statusCode: 401, message: 'Не авторизован' })
  }

  const body = await readBody(event)

  await db.update(widgets)
    .set({ settings: body.settings })
    .where(
      and(
        eq(widgets.id, id),
        eq(widgets.userId, session.user.id)
      )
    )

  return { success: true }
})