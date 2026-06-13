// server/api/integrations/lastfm/callback.get.ts
import { eq, and } from 'drizzle-orm'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  // 1. Проверяем сессию через nuxt-auth-utils
  const session = await requireUserSession(event)
  const userId = session.user.id
  
  // Получаем БД и схемы из контекста
  const db = event.context.db
  const { integrations } = await import('@@/server/database/schema')

  const query = getQuery(event)
  const token = query.token as string
  if (!token) throw createError({ statusCode: 400, message: 'Token is missing' })

  const config = useRuntimeConfig()
  const apiKey = process.env.NUXT_OAUTH_LASTFM_CLIENT_ID
  const apiSecret = process.env.NUXT_OAUTH_LASTFM_CLIENT_SECRET

  const sigStr = `api_key${apiKey}methodauth.getSessiontoken${token}${apiSecret}`
  const apiSig = crypto.createHash('md5').update(sigStr).digest('hex')

  const data: any = await $fetch('http://ws.audioscrobbler.com/2.0/', {
    query: {
      method: 'auth.getSession',
      format: 'json',
      api_key: apiKey,
      token,
      api_sig: apiSig,
    },
  })

  if (data.error) throw createError({ statusCode: 400, message: data.message })

  const sessionKey = data.session.key
  const lastfmUsername = data.session.name

  // Ищем существующую интеграцию
  const existing = await db.select().from(integrations).where(
    and(eq(integrations.userId, userId), eq(integrations.provider, 'lastfm'))
  ).get()

  if (existing) {
    await db.update(integrations)
      .set({ 
        accessToken: sessionKey, 
        providerUserId: lastfmUsername, 
        updatedAt: new Date() 
      })
      .where(eq(integrations.id, existing.id))
  } else {
    await db.insert(integrations).values({
      userId: userId,
      provider: 'lastfm',
      providerUserId: lastfmUsername,
      accessToken: sessionKey,
    })
  }

  return sendRedirect(event, '/cabinet')
})