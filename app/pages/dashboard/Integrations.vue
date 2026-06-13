<!-- app/pages/dashboard/integrations.vue -->
<script setup lang="ts">
import { inject } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard' // Магия! Страница сама оборачивается в сайдбар и Bento-карточку
})

// Если вдруг понадобятся данные юзера, просто "впрыскиваешь" их одной строчкой:
const user = inject<any>('currentUser')
</script>

<template>
  <div class="relative z-10 max-w-4xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-zinc-100">Интеграции</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h3 class="text-base font-bold text-zinc-200">Last.fm</h3>
          <p class="text-xs text-zinc-500 mt-1">Скроблинг музыки на стриме</p>
        </div>
        <NuxtLink to="/api/integrations/lastfm/connect" external class="px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg hover:text-sky-400 text-xs font-semibold">
          Подключить
        </NuxtLink>
      </div>
    </div>
  </div>
</template>