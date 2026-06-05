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
        
        if (dbUser) {
          // Обновляем существующего пользователя - добавляем discord_id
          await db
            .update(users)
            .set({
              discordId: user.id,
              avatar: user.avatar,
              updatedAt: new Date(),
            })
            .where(eq(users.id, dbUser.id))
          
          console.log('Updated existing user with Discord ID:', dbUser.email)
        }
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
            avatar: user.avatar,
            isEmailVerified: user.verified || false, // Соответствует вашей схеме
            createdAt: now,
            updatedAt: now,
          })
          .returning()
        
        dbUser = newUser[0]
        console.log('New user created with ID:', dbUser.id)
      } else {
        // 4. Обновляем время последнего входа для существующего пользователя
        await db
          .update(users)
          .set({ 
            updatedAt: new Date(),
            avatar: user.avatar // Обновляем аватар
          })
          .where(eq(users.id, dbUser.id))
      }
      
      // 5. Устанавливаем сессию
      await setUserSession(event, {
        user: {
          id: dbUser.id,
          discordId: user.id,
          name: dbUser.name,
          email: dbUser.email,
          avatar: user.avatar,
        },
        loggedInAt: Date.now(),
      })
      
      console.log('Session set, redirecting to cabinet...')
      
      // 6. Перенаправляем в личный кабинет
      return sendRedirect(event, '/cabinet')
      
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