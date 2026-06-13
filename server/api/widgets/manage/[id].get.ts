import { eq } from 'drizzle-orm'
import { widgets } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const db = event.context.db
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'Неверный ID виджета' })
  }

  const result = await db.select().from(widgets).where(eq(widgets.id, id)).limit(1)
  const widget = result[0]

  if (!widget) {
    throw createError({ statusCode: 404, message: 'Виджет не найден' })
  }

  // Парсим настройки обратно в JSON, если Drizzle отдал их как строку
  const settings = typeof widget.settings === 'string' 
    ? JSON.parse(widget.settings) 
    : widget.settings

  return {
    type: widget.type,
    settings
  }
})