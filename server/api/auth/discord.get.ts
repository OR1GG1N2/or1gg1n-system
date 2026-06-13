// server/api/auth/discord.get.ts
import { eq } from 'drizzle-orm'

export default defineOAuthDiscordEventHandler({
  async onSuccess(event, { user }) {
    console.log('Discord user data:', user)
    
    const db = event.context.db
    const { users } = await import('@@/server/database/schema')
    
    try {
      // 1. Ищем пользователя по discord_id
      let dbUser = await db
        .select()
        .from(users)
        .where(eq(users.discordId, user.id))
        .get()
      
      // 2. Если не нашли по discord_id, ищем по email
      if (!dbUser && user.email) {
        dbUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .get()
      }
      
      // 3. Создаём нового пользователя
      if (!dbUser) {
        console.log('Creating new user from Discord:', user.email || user.username)
        
        const now = new Date()
        
        const newUser = await db
          .insert(users)
          .values({
            discordId: user.id,
            email: user.email || null,
            name: user.global_name || user.username,
            avatar: user.avatar || null,
            isEmailVerified: user.verified || false,
            createdAt: now,
            updatedAt: now,
          })
          .returning()
        
        dbUser = newUser[0]
      } else {
        // 4. Обновляем существующего пользователя (один общий запрос)
        const updateData: Record<string, any> = { 
          updatedAt: new Date() 
        }

        // Если нашли по email, привязываем discordId
        if (dbUser.discordId !== user.id) {
          updateData.discordId = user.id
        }

        // Добавляем аватарку, только если её нет в базе, а в Discord она есть
        if (!dbUser.avatar && user.avatar) {
          updateData.avatar = user.avatar
          dbUser.avatar = user.avatar // Обновляем локально для корректной сессии
        }

        await db
          .update(users)
          .set(updateData)
          .where(eq(users.id, dbUser.id))
      }
      
      // 5. Устанавливаем сессию
      await setUserSession(event, {
        user: {
          id: dbUser.id,
          discordId: user.id,
          name: dbUser.name,
          email: dbUser.email,
          avatar: dbUser.avatar, // Сюда попадёт либо старая из БД, либо только что добавленная
        },
        loggedInAt: Date.now(),
      })
      
      console.log('Session set, redirecting to cabinet...')
      return sendRedirect(event, '/dashboard')
      
    } catch (error) {
      console.error('Discord OAuth error:', error)
      return sendRedirect(event, '/login?error=discord-auth-failed')
    }
  },
  
  onError(event, error) {
    console.error('Discord OAuth error:', error)
    return sendRedirect(event, '/login?error=discord-auth-failed')
  },
})