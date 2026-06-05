// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Получаем состояние сессии
  const { loggedIn } = useUserSession();
  
  // Если пользователь не залогинен, перенаправляем на страницу входа
  if (!loggedIn.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath } // Запоминаем, откуда пришли
    });
  }
});