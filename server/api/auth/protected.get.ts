// server/api/protected.get.ts
import { eq } from 'drizzle-orm';
import { users } from '@@/server/database/schema';
import { verifyApiToken } from '@@/server/utils/tokens';

export default defineEventHandler(async (event) => {
  let userId: number | null = null;
  
  // Пытаемся авторизоваться через сессию
  const session = await getUserSession(event);
  if (session.user?.id) {
    userId = session.user.id;
  }
  
  // Если нет сессии, проверяем Bearer токен
  if (!userId) {
    const authHeader = getHeader(event, 'authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const tokenData = await verifyApiToken(event.context.db, token);
      if (tokenData) {
        userId = tokenData.userId;
      }
    }
  }
  
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Не авторизован',
    });
  }
  
  // Получаем данные пользователя
  const user = await event.context.db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
    })
    .from(users)
    .where(eq(users.id, userId))
    .get();
  
  return {
    message: 'Доступ к защищенным данным разрешен',
    user,
  };
});