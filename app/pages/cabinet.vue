

<script setup lang="ts">
import { eq } from 'drizzle-orm';

definePageMeta({
  middleware: 'auth' // Защищаем страницу кабинета
});

const { loggedIn, user: sessionUser, clear, fetch } = useUserSession();
const router = useRouter();

const user = ref<any>(null);
const loading = ref(true);
const showSettings = ref(false);
const updating = ref(false);
const updateError = ref('');
const updateSuccess = ref('');



const editForm = ref({
  name: '',
  email: '',
  newPassword: '',
  avatar: ''
});

// Форматирование даты
const formatDate = (date: string) => {
  if (!date) return 'Недавно';
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Загрузка данных пользователя
const loadUserData = async () => {
  if (!sessionUser.value?.id) {
    loading.value = false;
    return;
  }
  
  try {
    const response = await $fetch('/api/user/profile');
    user.value = response.user;
    editForm.value.name = user.value.name || '';
    editForm.value.email = user.value.email;
    editForm.value.avatar = user.value.avatar || '';
  } catch (error) {
    console.error('Ошибка загрузки профиля:', error);
  } finally {
    loading.value = false;
  }
};

// Обновление профиля
const updateProfile = async () => {
  updating.value = true;
  updateError.value = '';
  updateSuccess.value = '';
  
  try {
    const response = await $fetch('/api/user/update', {
      method: 'PUT',
      body: editForm.value
    });
    
    updateSuccess.value = response.message;
    
    // Обновляем локальные данные
    user.value = response.user;
    
    // Обновляем сессию
    await fetch();
    
    // Закрываем модальное окно через 2 секунды
    setTimeout(() => {
      showSettings.value = false;
      updateSuccess.value = '';
    }, 2000);
    
  } catch (err: any) {
    updateError.value = err.data?.statusMessage || 'Ошибка обновления';
  } finally {
    updating.value = false;
  }
};

// Выход
const handleLogout = async () => {
  await $fetch('/api/auth/logout');
  await clear();
  await fetch();
  await router.push('/');
};

// Загружаем данные при монтировании
onMounted(() => {
  if (loggedIn.value) {
    loadUserData();
  } else {
    loading.value = false;
  }
});
</script>

<template>
     <div class="absolute inset-0 z-0 opacity-60 pointer-events-none" style="
      background-image: 
        linear-gradient(to right, rgba(56,189,248,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(56,189,248,0.05) 1px, transparent 1px),
        radial-gradient(circle at 50% 0%, rgba(14,165,233,0.15) 0%, rgba(56,189,248,0.05) 40%, transparent 70%);
      background-size: 40px 40px, 40px 40px, 100% 100%;
    "></div>
  <div class="min-h-screen bg-[#040b16] text-white font-unbounded p-6 md:p-12">
    <!-- Фоновый паттерн -->
    <div class="fixed inset-0 z-0 opacity-40 pointer-events-none" style="background-image: radial-gradient(circle at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%);"></div>

    <div class="relative z-10 max-w-4xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Личный кабинет</h1>

      <div v-if="loading" class="text-[#94a3b8] text-center py-20">Загрузка данных...</div>

      <div v-else-if="user" class="space-y-6">
        <!-- Профиль -->
        <div class="bg-[#061121] border border-[#102a4d] rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center backdrop-blur-sm">
          <img :src="user.avatar || 'https://placehold.net/avatar-2.svg'" alt="Аватар" class="w-24 h-24 rounded-full border border-[#1e3a5f]" />
          
          <div class="flex-grow text-center md:text-left">
            <h2 class="text-2xl font-bold mb-1">{{ user.name || 'Пользователь' }}</h2>
            <p class="text-[#64748b] text-sm mb-2">{{ user.email }}</p>
            <p class="text-[#38bdf8] text-xs uppercase tracking-widest font-bold">Участник с {{ formatDate(user.createdAt) }}</p>
          </div>

          <button @click="handleLogout" class="px-6 py-3 border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold">
            Выйти
          </button>
        </div>

        <!-- Статистика -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-[#061121] border border-[#102a4d] rounded-2xl p-8 backdrop-blur-sm">
            <h3 class="text-[#94a3b8] text-sm mb-4 uppercase tracking-wider font-bold">Статистика</h3>
            <div class="flex gap-8">
              <div>
                <div class="text-3xl font-black">{{ user.serversCount || 0 }}</div>
                <div class="text-[#64748b] text-xs">Серверов</div>
              </div>
              <div>
                <div class="text-3xl font-black">{{ user.playersCount || 0 }}</div>
                <div class="text-[#64748b] text-xs">Игроков</div>
              </div>
            </div>
          </div>

          <div class="bg-[#061121] border border-[#102a4d] rounded-2xl p-8 backdrop-blur-sm flex items-center justify-between">
            <div>
              <h3 class="text-[#94a3b8] text-sm mb-1 uppercase tracking-wider font-bold">Аккаунт</h3>
              <p class="text-sm">Управление профилем</p>
            </div>
            <button @click="showSettings = true" class="px-6 py-3 bg-[#0ea5e9] hover:bg-[#0284c7] rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]">
              Настройки
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-[#94a3b8]">Вы не авторизованы</p>
        <NuxtLink to="/login" class="mt-4 inline-block px-8 py-3 bg-[#0ea5e9] rounded-xl font-bold">Войти</NuxtLink>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="showSettings" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="showSettings = false">
      <div class="bg-[#0f1c2e] border border-[#1e3a5f] p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 class="text-xl font-bold mb-6">Настройки профиля</h2>
        <form @submit.prevent="updateProfile" class="space-y-4">
          <input v-model="editForm.name" type="text" placeholder="Имя" class="w-full bg-[#061121] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none" />
          <input v-model="editForm.email" type="email" placeholder="Email" class="w-full bg-[#061121] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none" />
          <input v-model="editForm.newPassword" type="password" placeholder="Новый пароль" class="w-full bg-[#061121] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none" />
          <input v-model="editForm.avatar" type="text" placeholder="URL на аватар" class="w-full bg-[#061121] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none" />
          
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showSettings = false" class="flex-1 py-3 bg-[#061121] rounded-xl">Отмена</button>
            <button type="submit" class="flex-1 py-3 bg-[#0ea5e9] rounded-xl font-bold">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;700;900&display=swap');
.font-unbounded { font-family: 'Unbounded', sans-serif; }
</style>