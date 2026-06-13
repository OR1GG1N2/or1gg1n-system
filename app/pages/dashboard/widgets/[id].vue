<!-- pages/dashboard/widgets/[id].vue -->
<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const route = useRoute()

// ВАЖНО: Запрос идет на четкий изолированный эндпоинт /api/widgets/manage/...
const { data: widget, error } = await useFetch<any>(`/api/widgets/manage/${route.params.id}`)

// Если API вернет ошибку, мы увидим её прямо на экране вместо белого листа
if (error.value) {
  console.error('Ошибка загрузки виджета с бэкенда:', error.value)
}

const isSaving = ref(false)

const saveSettings = async () => {
  isSaving.value = true
  try {
    // ВАЖНО: Здесь путь PATCH запроса тоже должен совпадать с новым эндпоинтом
    await $fetch(`/api/widgets/manage/${route.params.id}`, {
      method: 'PATCH',
      body: { settings: widget.value.settings }
    })
  } catch (err) {
    console.error('Ошибка сохранения:', err)
  } finally {
    isSaving.value = false
  }
}
const isCopied = ref(false)

const copyObsLink = () => {
  // Собираем ссылку вида http://localhost:3000/w/a2f50043
  const link = `${window.location.origin}/w/${route.params.id}`
  navigator.clipboard.writeText(link).then(() => {
    isCopied.value = true
    setTimeout(() => isCopied.value = false, 2000)
  })
}
</script>

<template>
  <!-- Если есть ошибка от API, выводим её -->
  <div v-if="error" class="p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl font-mono text-sm">
    Параметры виджета не найдены. Проверь роут: server/api/widgets/manage/[id].get.ts
    <pre class="mt-2 text-xs text-red-500/80">{{ error.message }}</pre>
  </div>

  <!-- Если всё ок, рендерим интерфейс -->
  <div v-else-if="widget" class="space-y-6 relative z-10">
    <!-- Шапка с кнопкой сохранения -->
    <div class="flex items-center justify-between border-b border-zinc-800/60 pb-4">
      <div>
        <h1 class="text-2xl font-bold text-zinc-100">Настройка виджета</h1>
        <p class="text-sm text-zinc-500 mt-0.5 capitalize">Тип: {{ widget.type === 'lastfm' ? 'Now Playing' : widget.type }}</p>
      </div>
      <button 
        @click="saveSettings" 
        :disabled="isSaving"
        class="px-4 py-2 bg-lime-600 hover:bg-lime-500 disabled:opacity-50 text-zinc-950 font-semibold rounded-xl text-sm transition-all"
      >
        {{ isSaving ? 'Сохранение...' : 'Сохранить изменения' }}
      </button>
    </div>
    <!-- Инпут для копирования в OBS -->
  <div class="p-4 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div class="space-y-0.5">
      <h3 class="text-sm font-bold text-zinc-200">Ссылка для OBS Studio</h3>
      <p class="text-xs text-zinc-500">Добавьте её в OBS как «Браузер» (Browser Source), установив нужные размеры.</p>
    </div>
    
    <div class="flex items-center gap-2 max-w-md w-full relative">
      <input 
        type="text" 
        readonly 
        :value="`.../w/${route.params.id}`" 
        class="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-3 py-2 text-xs text-zinc-400 font-mono focus:outline-none select-all"
      />
      <button 
        @click="copyObsLink"
        class="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700/50 transition-colors flex-shrink-0"
      >
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </button>
    </div>
  </div>

    <!-- Двухколоночный интерфейс: Настройки | Живой превью -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Левая колонка: Форма управления -->
      <div class="lg:col-span-5 bg-zinc-900/30 border border-zinc-800/80 p-5 rounded-2xl">
        <h2 class="text-xs font-bold text-zinc-500 mb-4 uppercase tracking-wider">Кастомизация стиля</h2>
        
        <WidgetsNowPlayingSettings 
          v-if="widget.type === 'lastfm'" 
          v-model="widget.settings" 
        />
      </div>

      <!-- Правая колонка: Превью -->
      <div class="lg:col-span-7 space-y-3 sticky top-6">
        <h2 class="text-xs font-bold text-zinc-500 uppercase tracking-wider">Превью (Вид в OBS)</h2>
        
        <div class="relative h-64 w-full rounded-2xl border border-zinc-800/80 overflow-hidden flex items-center justify-center bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] bg-zinc-950">
          <WidgetsNowPlayingCore 
            v-if="widget.type === 'lastfm'" 
            :config="widget.settings" 
          />
        </div>
      </div>

    </div>
  </div>
</template>