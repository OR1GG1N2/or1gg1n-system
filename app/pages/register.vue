<template>
  <div class="absolute inset-0 z-0 opacity-60 pointer-events-none" style="
      background-image: 
        linear-gradient(to right, rgba(56,189,248,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(56,189,248,0.05) 1px, transparent 1px),
        radial-gradient(circle at 50% 0%, rgba(14,165,233,0.15) 0%, rgba(56,189,248,0.05) 40%, transparent 70%);
      background-size: 40px 40px, 40px 40px, 100% 100%;
    "></div>
  <div class="min-h-screen bg-[#040b16] text-white font-unbounded flex items-center justify-center p-6">
    <!-- Фоновый паттерн -->
    <div class="fixed inset-0 z-0 opacity-40 pointer-events-none" style="background-image: radial-gradient(circle at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 70%);"></div>

    <div class="relative z-10 w-full max-w-md bg-[#061121] border border-[#102a4d] p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
      <h1 class="text-2xl font-bold mb-8 text-center">Создать аккаунт</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Имя -->
        <div>
          <label class="block text-sm font-medium text-[#94a3b8] mb-2">Имя</label>
          <input v-model="form.name" type="text" placeholder="Ваше имя" 
            class="w-full bg-[#0f1c2e] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none transition-all" />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-[#94a3b8] mb-2">Email</label>
          <input v-model="form.email" type="email" placeholder="example@mail.com" required
            class="w-full bg-[#0f1c2e] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none transition-all" />
        </div>

        <!-- Пароль -->
        <div>
          <label class="block text-sm font-medium text-[#94a3b8] mb-2">Пароль</label>
          <input v-model="form.password" type="password" placeholder="Минимум 6 символов" required
            class="w-full bg-[#0f1c2e] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none transition-all" />
        </div>

        <!-- Подтверждение -->
        <div>
          <label class="block text-sm font-medium text-[#94a3b8] mb-2">Подтверждение</label>
          <input v-model="confirmPassword" type="password" placeholder="Повторите пароль" required
            class="w-full bg-[#0f1c2e] border border-[#1e3a5f] p-3 rounded-xl focus:border-[#0ea5e9] outline-none transition-all" />
        </div>

        <!-- Сообщения -->
        <div v-if="error" class="p-3 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading || !isFormValid"
          class="w-full py-4 bg-[#0ea5e9] hover:bg-[#0284c7] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-[#64748b]">
        Уже есть аккаунт? <NuxtLink to="/login" class="text-[#0ea5e9] hover:text-[#38bdf8] font-bold">Войти</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetch } = useUserSession();

const form = ref({ name: '', email: '', password: '' });
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);

const isFormValid = computed(() => {
  return form.value.email && form.value.password.length >= 6 && form.value.password === confirmPassword.value;
});

const handleRegister = async () => {
  error.value = '';
  loading.value = true;
  try {
    await $fetch('/api/auth/register', { method: 'POST', body: form.value });
    await fetch();
    await navigateTo('/cabinet');
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Ошибка регистрации';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;700;900&display=swap');
.font-unbounded { font-family: 'Unbounded', sans-serif; }
</style>