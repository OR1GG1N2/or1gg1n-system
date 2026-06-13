<script setup lang="ts">
import { ref } from 'vue'

// Добавляем user в defineProps
defineProps<{
  mobileOpen: boolean
  user: any // Или опиши конкретный тип интерфейса, если он есть
}>()

const emit = defineEmits(['closeMobile'])
const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div>
    <!-- Мобильный бэкдроп -->
    <div 
      v-if="mobileOpen" 
      @click="emit('closeMobile')" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
    ></div>

    <!-- Контейнер сайдбара: изменен h-screen на h-full для десктопов -->
    <aside 
      class="
        fixed inset-y-0 left-0 z-50 flex flex-col border-r border-zinc-800 bg-zinc-950/95 p-4 text-zinc-400 backdrop-blur-md transition-all duration-300 ease-in-out shrink-0
        md:relative md:inset-auto md:h-full md:rounded-r-2xl md:border-y md:border-l
      "
      :class="[
        isCollapsed ? 'md:w-20' : 'md:w-64',
        mobileOpen ? 'translate-x-0 w-64' : '-translate-x-80 md:translate-x-0'
      ]"
    >
      <!-- Header: Логотип и Кнопка сворачивания -->
      <div class="flex items-center pb-5 px-1 justify-between" :class="{ 'md:justify-center': isCollapsed }">
        <NuxtLink v-if="!isCollapsed || mobileOpen" to="/" class="flex items-center gap-2.5 active:scale-95 transition-transform">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-lg font-bold tracking-tight text-zinc-100">
            OSDash
          </span>
        </NuxtLink>

        <button 
          @click="mobileOpen ? emit('closeMobile') : toggleCollapse()"
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-sky-400 hover:border-sky-500/30 transition-colors shadow-sm"
        >
          <svg v-if="mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 hidden md:block transition-transform duration-300" :class="{ 'rotate-180': isCollapsed }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

<!-- Профиль пользователя -->
<div class="mb-4 mt-1 px-0.5">
  <!-- Показываем блок, только если данные юзера доехали -->
  <div v-if="user" class="flex w-full items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-2 text-left shadow-sm">
    <div class="relative h-8 w-8 shrink-0">
      <!-- Динамический аватар из пропса -->
      <img :src="user.avatar || 'https://placehold.net/avatar-2.svg'" class="w-full h-full rounded-lg object-cover ring-2 ring-sky-500/10" alt="Avatar">
      <div class="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-zinc-950 bg-emerald-500"></div>
    </div>
    <div v-if="!isCollapsed || mobileOpen" class="flex flex-col min-w-0 flex-1 animate-fade">
      <!-- Динамическое имя -->
      <span class="text-xs font-semibold truncate text-zinc-200">{{ user.name || 'Пользователь' }}</span>
      <span class="text-[10px] text-zinc-500 font-medium">Twitch Провайдер</span>
    </div>
  </div>
</div>

      <hr class="border-zinc-800/80 mb-4 mx-1" />

      <!-- Блок навигации -->
      <div class="flex-1 space-y-5 overflow-y-auto px-0.5 scrollbar-none">
        <div class="space-y-1">
          <span v-if="!isCollapsed || mobileOpen" class="px-2.5 text-[9px] font-bold uppercase tracking-wider text-zinc-600 block animate-fade">Аналитика</span>
          <NuxtLink 
            to="/dashboard" 
            class="flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-medium transition-all hover:bg-zinc-900/50 hover:text-zinc-200" 
            active-class="bg-sky-950/30 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.03)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V16zM14 14a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
            <span v-if="!isCollapsed || mobileOpen" class="truncate animate-fade">Панель управления</span>
          </NuxtLink>
        </div>

        <div class="space-y-1">
          <span v-if="!isCollapsed || mobileOpen" class="px-2.5 text-[9px] font-bold uppercase tracking-wider text-zinc-600 block animate-fade">Инструменты</span>
          <NuxtLink 
            to="/dashboard/overlays" 
            class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all hover:bg-zinc-900/50 hover:text-zinc-200" 
            active-class="bg-sky-950/30 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.03)]"
          >
            <div class="flex items-center gap-3 min-w-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <span v-if="!isCollapsed || mobileOpen" class="truncate animate-fade">Оверлеи & Виджеты</span>
            </div>
            <span v-if="!isCollapsed || mobileOpen" class="rounded bg-sky-950/80 px-1 py-0.5 text-[8px] font-bold text-sky-400 border border-sky-500/30 animate-fade">New</span>
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/integrations" 
            class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all hover:bg-zinc-900/50 hover:text-zinc-200" 
            active-class="bg-sky-950/30 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.03)]"
          >
            <div class="flex items-center gap-3 min-w-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <span v-if="!isCollapsed || mobileOpen" class="truncate animate-fade">Подключения</span>
            </div>
            <span v-if="!isCollapsed || mobileOpen" class="rounded bg-sky-950/80 px-1 py-0.5 text-[8px] font-bold text-sky-400 border border-sky-500/30 animate-fade">New</span>
          </NuxtLink>
        </div>
      </div>

      <hr class="border-zinc-800/80 my-2 mx-1" />

      <!-- Футер -->
      <div class="space-y-1.5 pt-1">
        <div class="grid gap-2 px-0.5" :class="isCollapsed && !mobileOpen ? 'grid-cols-1' : 'grid-cols-2'">
          <a href="https://discord.gg" target="_blank" class="flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 py-1.5 text-[11px] font-medium hover:bg-zinc-800 hover:text-zinc-200 transition-colors">
            <span v-if="!isCollapsed || mobileOpen" class="animate-fade">Discord</span>
            <span v-else>DC</span>
          </a>
          <a href="https://github.com" target="_blank" class="flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 py-1.5 text-[11px] font-medium hover:bg-zinc-800 hover:text-zinc-200 transition-colors">
            <span v-if="!isCollapsed || mobileOpen" class="animate-fade">GitHub</span>
            <span v-else>GH</span>
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
.animate-fade { animation: fadeIn 0.15s ease-in-out forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-2px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>