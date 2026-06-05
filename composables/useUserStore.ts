// composables/useUserStore.ts
export const useUserStore = () => {
  // Глобальное состояние пользователя
  const userData = useState<any>('userData', () => null);
  const userLoaded = useState<boolean>('userLoaded', () => false);
  const userLoading = useState<boolean>('userLoading', () => false);
  const lastFetchTime = useState<number>('lastFetchTime', () => 0);
  
  // Кэшируем данные в cookie
  const cookieUser = useCookie('user_data', {
    maxAge: 60 * 60 * 24, // 24 часа
    sameSite: 'strict',
  });
  
  // Загрузка данных пользователя
  const fetchUserData = async (force = false) => {
    // Если данные уже есть и не форсируем
    if (!force && userData.value && userLoaded.value) {
      return userData.value;
    }
    
    // Проверяем кэш (5 минут)
    const now = Date.now();
    if (!force && userData.value && (now - lastFetchTime.value) < 5 * 60 * 1000) {
      return userData.value;
    }
    
    // Если уже загружается
    if (userLoading.value) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!userLoading.value) {
            clearInterval(interval);
            resolve(userData.value);
          }
        }, 100);
      });
    }
    
    userLoading.value = true;
    
    try {
      // Пытаемся восстановить из cookie
      if (!force && cookieUser.value) {
        userData.value = cookieUser.value;
        userLoaded.value = true;
        lastFetchTime.value = now;
        return userData.value;
      }
      
      // Проверяем сессию
      const { loggedIn } = useUserSession();
      if (!loggedIn.value) {
        userData.value = null;
        userLoaded.value = true;
        return null;
      }
      
      // Запрашиваем с сервера
      const response = await $fetch('/api/user/profile');
      userData.value = response.user;
      userLoaded.value = true;
      lastFetchTime.value = now;
      
      // Сохраняем в cookie
      cookieUser.value = response.user;
      
      return userData.value;
    } catch (error) {
      console.error('Error fetching user data:', error);
      userData.value = null;
      userLoaded.value = true;
      return null;
    } finally {
      userLoading.value = false;
    }
  };
  
  // Обновление данных пользователя
  const updateUserData = async (updates: any) => {
    try {
      const response = await $fetch('/api/user/update', {
        method: 'PUT',
        body: updates,
      });
      
      userData.value = response.user;
      cookieUser.value = response.user;
      lastFetchTime.value = Date.now();
      
      const { fetch } = useUserSession();
      await fetch();
      
      return response;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };
  
  // Очистка данных
  const clearUserData = () => {
    userData.value = null;
    userLoaded.value = false;
    userLoading.value = false;
    lastFetchTime.value = 0;
    cookieUser.value = null;
  };
  
  return {
    userData: readonly(userData),
    userLoaded: readonly(userLoaded),
    userLoading: readonly(userLoading),
    fetchUserData,
    updateUserData,
    clearUserData,
  };
};