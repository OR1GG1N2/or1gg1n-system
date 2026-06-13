// server/api/widgets/initialize.post.ts
import { and, eq } from 'drizzle-orm'
import { widgets } from '~~/server/database/schema'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const db = event.context.db
  const session = await getUserSession(event)

  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'Не авторизован' })
  }

  const body = await readBody(event)
  const type = body?.type

  if (!type) {
    throw createError({ statusCode: 400, message: 'Не указан тип виджета' })
  }

  // 1. Ищем, вдруг юзер уже инициализировал этот виджет ранее
  const existingResult = await db.select()
    .from(widgets)
    .where(
      and(
        eq(widgets.userId, session.user.id),
        eq(widgets.type, type)
      )
    )
    .limit(1)

  if (existingResult[0]) {
    return existingResult[0] // Если нашли — просто отдаем его
  }

  // 2. Если первый клик — создаем с дефолтными настройками
  const defaultSettings = type === 'lastfm'
    ? { textColor: '#f4f4f5', accentColor: '#84cc16', showCover: true }
    : { fontSize: '14px', chatSpeed: 'normal', theme: 'dark' }

  const newWidget = {
    id: randomUUID().substring(0, 8),
    userId: session.user.id,
    type,
    settings: defaultSettings
  }

  await db.insert(widgets).values(newWidget)
  return newWidget
})