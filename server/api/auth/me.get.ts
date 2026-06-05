// server/api/auth/me.get.ts

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  
  if (!session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Не авторизован',
    });
  }
  
  return {
    user: session.user,
    loggedInAt: session.loggedInAt,
  };
});