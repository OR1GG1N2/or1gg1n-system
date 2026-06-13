// server/api/dashboard/init.ts
export default defineEventHandler(async (event) => {
  // Проверяем сессию (из nuxt-auth-utils)
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  // Делаем параллельные запросы к базе данных через Drizzle
  const [userProfile, integrations] = await Promise.all([
    db.query.users.findFirst({ where: eq(users.id, session.user.id) }),
    db.query.integrations.findMany({ where: eq(integrations.userId, session.user.id) })
  ])

  // Возвращаем всё одним пакетом
  return {
    user: userProfile,
    integrations: integrations,
    stats: {
      serversCount: userProfile?.serversCount || 0
      // любые другие быстрые счетчики
    }
  }
})