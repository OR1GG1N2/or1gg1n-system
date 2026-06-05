// server/api/tokens/create.post.ts
import { createApiToken, revokeAllUserTokens } from '@@/server/utils/tokens';

export default defineEventHandler(async (event) => {
  // Требуем авторизацию через сессию
  const session = await requireUserSession(event);
  
  const db = event.context.db;
  const body = await readBody(event);
  
  // Опционально: отзываем старые токены
  if (body.revokePrevious) {
    await revokeAllUserTokens(db, session.user.id);
  }
  
  const newToken = await createApiToken(
    db, 
    session.user.id, 
    body.expiresInDays || 30
  );
  
  return {
    message: 'API токен создан',
    token: newToken,
    expiresInDays: body.expiresInDays || 30,
  };
});