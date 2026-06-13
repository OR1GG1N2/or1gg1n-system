import { eq } from 'drizzle-orm'
import { widgets } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const db = event.context.db
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'Не указан ID виджета' })
  }

  const result = await db.select()
    .from(widgets)
    .where(eq(widgets.id, id))
    .limit(1)

  const widget = result[0]
  
  if (!widget) {
    throw createError({ statusCode: 404, message: 'Виджет не найден' })
  }

  // Десериализуем настройки, если они лежат строкой
  if (widget.settings && typeof widget.settings === 'string') {
    widget.settings = JSON.parse(widget.settings)
  }

  return {
    type: widget.type,
    settings: widget.settings
  }
})