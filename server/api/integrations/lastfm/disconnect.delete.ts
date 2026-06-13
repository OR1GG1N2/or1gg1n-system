import { and, eq } from 'drizzle-orm'
import { integrations } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const db = event.context.db

  // 1. Получаем сессию
  const session = await getUserSession(event)
  
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'Не авторизован' })
  }

  // 2. Удаляем запись, проверяя и userId, и провайдера
  await db.delete(integrations)
    .where(
      and(
        eq(integrations.userId, session.user.id),
        eq(integrations.provider, 'lastfm')
      )
    )

  // 3. Возвращаем статус успешного удаления
  return { success: true }
})