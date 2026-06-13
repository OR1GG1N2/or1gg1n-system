import { eq } from 'drizzle-orm'
import { integrations } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const db = event.context.db

  // 1. Получаем сессию
  const session = await getUserSession(event)
  
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'Не авторизован' })
  }

  // 2. Запрос напрямую в обработчике
  const result = await db
    .select({
      provider: integrations.provider
    })
    .from(integrations)
    .where(eq(integrations.userId, session.user.id))

  // 3. Возвращаем массив строк: ["twitch", "lastfm"]
  return result.map((item: any) => item.provider)
})