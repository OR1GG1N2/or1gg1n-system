<template>
  <div class="min-h-screen bg-[#040b16] text-white font-unbounded relative overflow-hidden selection:bg-[#0ea5e9] selection:text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    
    <!-- Фоновый паттерн -->
    <div class="absolute inset-0 z-0 opacity-60 pointer-events-none" style="
      background-image: 
        linear-gradient(to right, rgba(56,189,248,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(56,189,248,0.05) 1px, transparent 1px),
        radial-gradient(circle at 50% 0%, rgba(14,165,233,0.15) 0%, rgba(56,189,248,0.05) 40%, transparent 70%);
      background-size: 40px 40px, 40px 40px, 100% 100%;
    "></div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Логотип и заголовок -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 rounded-2xl bg-[#0f1c2e] border border-[#1e3a5f] flex items-center justify-center text-[#38bdf8] shadow-lg shadow-[#0ea5e9]/10">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-white mb-2 tracking-tight">Добро пожаловать</h2>
        <p class="text-[#94a3b8] text-sm">Войдите в свой аккаунт для продолжения</p>
      </div>

      <!-- Форма входа -->
      <div class="bg-[#061121] border border-[#102a4d] rounded-2xl p-8 backdrop-blur-sm relative group transition-colors hover:border-[#1e3a5f]">
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-[#e0f2fe] mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <input
                v-model="form.email"
                type="email"
                required
                class="block w-full pl-11 pr-4 py-3.5 bg-[#0f1c2e] border border-[#1e3a5f] rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all font-sans"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <!-- Пароль -->
          <div>
            <label class="block text-sm font-medium text-[#e0f2fe] mb-2">
              Пароль
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full pl-11 pr-12 py-3.5 bg-[#0f1c2e] border border-[#1e3a5f] rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all font-sans"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-[#64748b] hover:text-[#38bdf8] transition-colors"
              >
                <!-- Eye -->
                <svg v-if="!showPassword" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <!-- Eye Slash -->
                <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Запомнить меня и Забыли пароль -->
          <div class="flex items-center justify-between mt-4">
            <label class="flex items-center cursor-pointer group">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 rounded border-[#1e3a5f] bg-[#0f1c2e] text-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
              />
              <span class="ml-2 text-sm text-[#94a3b8] group-hover:text-[#e0f2fe] transition-colors">Запомнить меня</span>
            </label>
            <a href="#" class="text-sm font-medium text-[#0ea5e9] hover:text-[#38bdf8] transition-colors">
              Забыли пароль?
            </a>
          </div>

          <!-- Ошибка -->
          <div v-if="error" class="bg-red-900/20 border border-red-500/50 rounded-xl p-3 flex items-center gap-3">
            <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
            </svg>
            <p class="text-red-400 text-sm font-sans">{{ error }}</p>
          </div>

          <!-- Кнопка входа -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-xl font-bold transition-all shadow-[0_0_24px_rgba(14,165,233,0.25)] hover:shadow-[0_0_32px_rgba(14,165,233,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_24px_rgba(14,165,233,0.25)]"
          >
            <span v-if="!loading">Войти</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Вход...
            </span>
          </button>

          <!-- Разделитель -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#1e3a5f]"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-3 bg-[#061121] text-[#64748b] uppercase tracking-wider">Или</span>
            </div>
          </div>

          <!-- Discord кнопка -->
          <button
            type="button"
            @click="handleDiscordLogin"
            class="w-full py-3.5 bg-[#0f1c2e] border border-[#1e3a5f] hover:bg-[#1e3a5f] hover:border-[#5865F2] text-[#e0f2fe] rounded-xl font-bold transition-all flex items-center justify-center gap-3"
          >
            <svg class="w-5 h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0c-.162-.386-.396-.875-.606-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Войти через Discord
          </button>
        </form>

        <!-- Ссылка на регистрацию -->
        <p class="mt-8 text-center text-sm text-[#94a3b8]">
          Нет аккаунта?
          <NuxtLink to="/register" class="text-[#0ea5e9] hover:text-[#38bdf8] font-bold transition-colors">
            Зарегистрироваться
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetch } = useUserSession();

const form = ref({
  email: '',
  password: '',
  rememberMe: false,
});

const showPassword = ref(false);
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
        rememberMe: form.value.rememberMe,
      },
    });
    
    await fetch();
    await navigateTo('/cabinet');
    
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Неверный email или пароль';
  } finally {
    loading.value = false;
  }
};

const handleDiscordLogin = () => {
  window.location.href = '/api/auth/discord';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;700;900&display=swap');

.font-unbounded {
  font-family: 'Unbounded', sans-serif;
}
</style>