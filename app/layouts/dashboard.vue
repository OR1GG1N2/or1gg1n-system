<!-- app/layouts/dashboard.vue -->
<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'

const { loggedIn, user: sessionUser } = useUserSession()
const user = ref<any>(null)
const loading = ref(true)
const isMobileMenuOpen = ref(false)

const loadUserData = async () => {
  if (!sessionUser.value?.id) {
    loading.value = false
    return
  }
  try {
    // Профиль запрашивается ОДИН раз для всех страниц кабинета!
    const response = await $fetch('/api/user/profile')
    user.value = response.user
  } catch (error) {
    console.error('Ошибка загрузки профиля:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (loggedIn.value) loadUserData()
  else loading.value = false
})

// Делимся данными пользователя с любой страницей, которая захочет их взять
provide('currentUser', user)
provide('isProfileLoading', loading)
</script>

<template>
  <!-- Внешний Bento-контейнер с общим шрифтом -->
  <div class="flex h-screen w-screen flex-col md:flex-row bg-zinc-950 font-inter text-zinc-300 md:py-4 md:pr-4 gap-4 overflow-hidden relative">
    
    <!-- Мобильная плашка сверху -->
    <div class="flex md:hidden items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-xl mx-4 mt-4 px-4 py-3 relative z-30 shrink-0">
      <span class="text-md font-bold tracking-tight text-zinc-100">OSDash</span>
      <button @click="isMobileMenuOpen = true" class="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
    </div>

    <!-- Общая фоновая сетка -->
    <div class="absolute inset-0 z-0 opacity-15 pointer-events-none" style="background-image: linear-gradient(to right, rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.01) 1px, transparent 1px); background-size: 32px 32px;"></div>

    <!-- Наш адаптивный сайдбар. Он сам берёт переданного ему user -->
    <TheSidebar :mobile-open="isMobileMenuOpen" :user="user" @close-mobile="isMobileMenuOpen = false" class="z-40" />

    <!-- Правое "окошко" Bento. Сюда Nuxt будет автоматически подставлять код твоих страниц -->
    <main class="flex-grow bg-zinc-900/40 border border-zinc-800/80 rounded-xl md:rounded-2xl overflow-y-auto p-6 md:p-12 relative z-10 shadow-2xl mx-4 mb-4 md:m-0 scrollbar-none">
      <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(circle at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 65%);"></div>

      <!-- Если профиль ещё грузится, показываем один общий лоадер -->
      <div v-if="loading" class="text-zinc-500 text-center py-20 text-sm">Загрузка...</div>
      
      <!-- Сюда залетает контент страниц -->
      <slot v-else />
    </main>
  </div>
</template>