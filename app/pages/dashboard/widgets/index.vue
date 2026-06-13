<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const loadingType = ref<string | null>(null)

// Наш статический список доступных виджетов
const catalog = [
  {
    type: 'lastfm',
    title: 'Now Playing (Last.fm)',
    description: 'Выводит текущий трек с вашего музыкального плеера на стрим.',
    colorClass: 'bg-red-500/10 text-red-400 border-red-500/20'
  },
  {
    type: 'chat',
    title: 'Стрим-чат',
    description: 'Отображает сообщения из Twitch чата поверх вашей трансляции.',
    colorClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  {
    type: 'alerts',
    title: 'Оповещения (Алерты)',
    description: 'Красивые уведомления о подписках, донатах и фолловерах.',
    colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  }
]

// Обработка клика по виджету
const handleWidgetClick = async (type: string) => {
  if (loadingType.value) return
  loadingType.value = type
  
  try {
    // Отправляем запрос «найди или создай»
    const widget = await $fetch<any>('/api/widgets/initialize', {
      method: 'POST',
      body: { type }
    })
    
    // Мгновенно перекидываем на страницу кастомизации конкретного инстанса
    await navigateTo(`/dashboard/widgets/${widget.id}`)
  } catch (err) {
    console.error('Ошибка инициализации виджета:', err)
  } finally {
    loadingType.value = null
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8 relative z-10">
    
    <!-- Заголовок -->
    <div>
      <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">Виджеты для стрима</h1>
      <p class="text-sm text-zinc-500 mt-1">Выберите нужный оверлей, настройте его стиль и добавьте в OBS Studio.</p>
    </div>

    <!-- Сетка каталога (Bento) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      
      <div 
        v-for="item in catalog" 
        :key="item.type"
        @click="handleWidgetClick(item.type)"
        class="group relative flex flex-col justify-between p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/50 cursor-pointer transition-all duration-300"
      >
        <div class="space-y-4">
          <!-- Иконка и статус -->
          <div class="flex items-center justify-between">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl border" :class="item.colorClass">
              <!-- Временная универсальная иконка (можешь заменить на свои) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
          </div>

          <!-- Текст -->
          <div>
            <h3 class="text-base font-bold text-zinc-200 group-hover:text-lime-400 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>

        <!-- Кнопка действия (индикатор) -->
        <div class="mt-6 pt-4 border-t border-zinc-800/40 flex items-center justify-between text-xs font-semibold">
          <span class="text-zinc-500 group-hover:text-zinc-300 transition-colors">
            {{ loadingType === item.type ? 'Загрузка...' : 'Открыть настройки' }}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-zinc-600 group-hover:text-lime-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>

    </div>
  </div>
</template>