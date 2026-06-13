<!-- app/pages/dashboard/profile.vue -->
<script setup lang="ts">
import { inject } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard' // Привязываем к нашему шаблону каркаса
})

const { clear, fetch } = useUserSession()
const router = useRouter()

// Забираем данные пользователя, которые для нас уже загрузил Layout
const user = inject<any>('currentUser')

const showSettings = ref(false)
// ... тут оставляешь свои функции: editForm, updateProfile ...

const handleLogout = async () => {
  await $fetch('/api/auth/logout')
  await clear()
  await fetch()
  await router.push('/')
}
</script>

<template>
  <div v-if="user" class="relative z-10 max-w-4xl mx-auto space-y-6">
    <!-- Блок профиля -->
    <div class="bg-zinc-950/40 border border-zinc-800/60 rounded-xl md:rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center backdrop-blur-sm">
      <img :src="user.avatar || 'https://placehold.net/avatar-2.svg'" alt="Аватар" class="w-20 h-20 md:w-24 md:h-24 rounded-full border border-zinc-800 object-cover" />
      <div class="flex-grow text-center sm:text-left">
        <h2 class="text-xl md:text-2xl font-bold text-zinc-100">{{ user.name || 'Пользователь' }}</h2>
        <p class="text-zinc-500 text-xs md:text-sm mb-2">{{ user.email }}</p>
        <p class="text-sky-400 text-[10px] uppercase tracking-widest font-semibold">Личный кабинет</p>
      </div>
      <button @click="handleLogout" class="w-full sm:w-auto px-5 py-2.5 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl text-xs font-medium shrink-0">
        Выйти
      </button>
    </div>

    <!-- Блоки Bento (Статистика и Настройки) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      <div class="bg-zinc-950/40 border border-zinc-800/60 rounded-xl md:rounded-2xl p-6 p-8">
        <h3 class="text-zinc-500 text-[11px] mb-3 uppercase tracking-wider font-bold">Статистика</h3>
        <div class="text-2xl font-bold text-zinc-100">{{ user.serversCount || 0 }} серверов</div>
      </div>

      <div class="bg-zinc-950/40 border border-zinc-800/60 rounded-xl md:rounded-2xl p-6 p-8 flex items-center justify-between">
        <div>
          <h3 class="text-zinc-500 text-[11px] mb-1 uppercase tracking-wider font-bold">Аккаунт</h3>
          <p class="text-xs text-zinc-500">Изменить данные</p>
        </div>
        <button @click="showSettings = true" class="px-5 py-2.5 bg-sky-500 text-zinc-950 rounded-xl font-bold text-xs">
          Настройки
        </button>
      </div>
    </div>
  </div>
</template>