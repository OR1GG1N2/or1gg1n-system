<template>
  <div class="min-h-screen bg-[#040b16] text-white font-unbounded flex flex-col items-center justify-center p-6">
    <!-- Фоновый паттерн -->
    <div class="fixed inset-0 z-0 opacity-40 pointer-events-none" style="background-image: radial-gradient(circle at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 70%);"></div>

    <div class="relative z-10 max-w-2xl w-full text-center">
      <h1 class="text-4xl md:text-6xl font-black mb-6 tracking-tight">
        Шаблон<span class="text-[#0ea5e9]">NUXT</span>
      </h1>
      <p class="text-[#94a3b8] mb-12 text-lg">Удобное управление вашими игровыми серверами</p>

      <!-- Состояние: Авторизован -->
      <div v-if="loggedIn" class="bg-[#061121] border border-[#102a4d] p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
        <h2 class="text-xl font-bold mb-2">Привет, {{ user?.name || user?.email }}!</h2>
        <p class="text-[#64748b] mb-8">текст</p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/cabinet" class="px-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]">
            Личный кабинет
          </NuxtLink>
          <button @click="handleLogout" class="px-8 py-4 bg-[#0f1c2e] border border-[#1e3a5f] hover:border-red-500/50 hover:text-red-400 rounded-xl font-bold transition-all">
            Выйти
          </button>
        </div>
      </div>

      <!-- Состояние: Гость -->
      <div v-else class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/login" class="px-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]">
            Войти
          </NuxtLink>
          <NuxtLink to="/register" class="px-8 py-4 bg-[#0f1c2e] border border-[#1e3a5f] hover:border-[#38bdf8] rounded-xl font-bold transition-all">
            Зарегистрироваться
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, user, clear, fetch } = useUserSession();

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout');
    await clear();
    await fetch();
    await navigateTo('/');
  } catch (error) {
    console.error('Ошибка выхода:', error);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;700;900&display=swap');
.font-unbounded { font-family: 'Unbounded', sans-serif; }
</style>