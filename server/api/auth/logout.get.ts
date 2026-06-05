export default defineEventHandler(async (event) => {
  // clearUserSession доступна глобально
  await clearUserSession(event);
  return { message: 'Выход выполнен успешно' };
});