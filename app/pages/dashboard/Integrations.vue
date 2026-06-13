<!-- app/pages/dashboard/integrations.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const { data: integrations, refresh } = await useFetch<string[]>('/api/integrations')

// Прямая проверка наличия строки в массиве
const isLastfmConnected = computed(() => integrations.value?.includes('lastfm') || false)
const isTwitchConnected = computed(() => integrations.value?.includes('twitch') || false)
const isDiscordConnected = computed(() => integrations.value?.includes('discord') || false)

const isDisconnecting = ref(false)
const handleDisconnect = async () => {
  if (isDisconnecting.value) return
  isDisconnecting.value = true
  try {
    // 1. Отправляем запрос на удаление
    await $fetch('/api/integrations/lastfm/disconnect', { method: 'DELETE' })
    
    // 2. Просто обновляем данные с сервера. 
    // Наш useFetch перевызовет API, вернет массив без 'lastfm', 
    // и все computed-свойства автоматически пересчитаются.
    await refresh()
    
  } catch (error) {
    console.error('Ошибка при отключении Last.fm:', error)
  } finally {
    isDisconnecting.value = false
  }
}
</script>

<template>
  <!-- ОДИН корневой элемент для предотвращения ошибок Vue DOM -->
  <div class="max-w-4xl mx-auto space-y-8 relative z-10">
    
    <!-- Заголовок секции -->
    <div>
      <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">Интеграции</h1>
      <p class="text-sm text-zinc-500 mt-1">Управляйте внешними сервисами и платформами для вашего стрима.</p>
    </div>

    <!-- Сетка интеграций (Bento Style) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      <!-- 1. КАРТОЧКА: Last.fm (Полностью рабочая) -->
<div 
  class="group relative flex flex-col justify-between p-6 bg-zinc-900/30 border rounded-2xl transition-all duration-300" 
  :class="isLastfmConnected ? 'border-lime-800/80 hover:border-lime-700/80' : 'border-zinc-800/80 hover:border-zinc-700/80'"
>        <div class="flex items-start justify-between gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2.5">
              <!-- Красная иконка Last.fm -->
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 10l12-3M9 14H4a2 2 0 00-2 2v3a2 2 0 002 2h5v-5z" /></svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-zinc-200">Last.fm</h3>
                <p class="text-[11px] text-zinc-500">Музыкальный статус</p>
              </div>
            </div>
            <p class="text-xs text-zinc-400 leading-relaxed pt-2">
              Автоматически выводит текущий трек со стримерского плеера в виджеты "Now Playing" на вашем экране.
            </p>
          </div>

          <!-- Индикатор статуса -->

        </div>

        <!-- Кнопка действия -->
        <div class="mt-6 pt-4 border-t border-zinc-800/60 flex justify-end">
          <button 
            v-if="isLastfmConnected"
            @click="handleDisconnect"
            :disabled="isDisconnecting"
            class="px-4 py-2 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/20 disabled:opacity-50 text-xs font-semibold rounded-xl transition-all"
          >
            {{ isDisconnecting ? 'Отключение...' : 'Отключить интеграцию' }}
          </button>

          <NuxtLink 
            v-else
            to="/api/integrations/lastfm/connect" 
            external 
            class="px-4 py-2 bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-sky-400 hover:border-sky-500/30 text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            Подключить профиль
          </NuxtLink>
        </div>
      </div>

      <!-- 2. КАРТОЧКА: Twitch (Пример статического сервиса, который обычно подключен сразу) -->
      <div class="group relative flex flex-col justify-between p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl hover:border-zinc-700/80 transition-all duration-300"
      :class="isTwitchConnected ? 'border-lime-800/80 hover:border-lime-700/80' : 'border-zinc-800/80 hover:border-zinc-700/80'">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11l-4-4m0 0l-4 4m4-4v12a3 3 0 01-3 3H6" /></svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-zinc-200">Twitch Провайдер</h3>
                <p class="text-[11px] text-zinc-500">Основная платформа</p>
              </div>
            </div>
            <p class="text-xs text-zinc-400 leading-relaxed pt-2">
              Служит для авторизации, чтения чата, отслеживания платных подписок, баллов канала и фолловеров.
            </p>
          </div>

          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border bg-emerald-500/5 border-emerald-500/20 text-emerald-400">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Основной
          </span>
        </div>

        <div class="mt-6 pt-4 border-t border-zinc-800/60 flex justify-end">
          <button 
            v-if="isTwitchConnected"
            @click="handleDisconnect"
            :disabled="isDisconnecting"
            class="px-4 py-2 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/20 disabled:opacity-50 text-xs font-semibold rounded-xl transition-all"
          >
            {{ isDisconnecting ? 'Отключение...' : 'Отключить интеграцию' }}
          </button>
        </div>
      </div>

      <!-- 3. КАРТОЧКА: Discord (Будущая интеграция) -->
      <div class="group relative flex flex-col justify-between p-6 bg-zinc-900/15 border border-zinc-800/40 rounded-2xl opacity-60">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9l-4 4v-4H3a2 2 0 01-2-2v-6a2 2 0 012-2h2M7 12h.01M11 12h.01" /></svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-zinc-300">Discord Bot</h3>
                <p class="text-[11px] text-zinc-600">Оповещения</p>
              </div>
            </div>
            <p class="text-xs text-zinc-500 leading-relaxed pt-2">
              Отправка автоматических анонсов о начале трансляции в текстовые каналы вашего Discord-сервера.
            </p>
          </div>

          <span class="inline-flex items-center rounded bg-zinc-900 px-1.5 py-0.5 text-[9px] font-bold text-zinc-600 border border-zinc-800/80 uppercase">Скоро</span>
        </div>

        <div class="mt-6 pt-4 border-t border-zinc-800/40 flex justify-end">
          <button disabled class="px-4 py-2 bg-transparent text-zinc-600 text-xs font-semibold rounded-xl cursor-not-allowed">
            Недоступно
          </button>
        </div>
      </div>

    </div>
  </div>
</template>