<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'default' // или твой стандартный публичный лайаут
})

// Проверяем статус авторизации (опционально, чтобы менять текст кнопки)
const { loggedIn } = useUserSession()
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center relative overflow-hidden px-4 py-16 bg-zinc-950 text-zinc-100">
    
    <!-- Декоративный размытый фон (Catppuccin/Neon Aura) -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
    <div class="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

    <!-- Главный экран (Hero Section) -->
    <div class="relative z-10 text-center max-w-3xl mx-auto space-y-6 mb-16">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-medium">
        <span class="flex h-2 w-2 rounded-full bg-lime-400 animate-pulse"></span>
        Open Source проект для стримеров
      </div>
      
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-50 to-zinc-400">
        Прокачай свой стрим с <span class="text-lime-400 font-black">OSDash</span>
      </h1>
      
      <p class="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
        Управляй кастомными виджетами, выводи музыку из Last.fm и кастомизируй чат в реальном времени. Всё в одном месте, без ограничений.
      </p>

      <div class="pt-4 flex justify-center">
        <NuxtLink 
          :to="loggedIn ? '/dashboard/widgets' : '/login'"
          class="inline-flex items-center gap-2 px-6 py-3 bg-lime-600 hover:bg-lime-500 active:scale-[0.98] text-zinc-950 font-bold rounded-xl text-base shadow-lg shadow-lime-600/10 transition-all duration-200"
        >
          {{ loggedIn ? 'Войти в панель управления' : 'Начать бесплатно' }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Сетка фич (Bento Grid) -->
    <div class="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      
      <!-- Фича 1: Интеграция Last.fm -->
      <div class="md:col-span-2 p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl flex flex-col justify-between backdrop-blur-sm group hover:border-zinc-700/60 transition-colors">
        <div class="space-y-2">
          <div class="text-red-400 font-bold text-xs uppercase tracking-wider">Музыка на стриме</div>
          <h3 class="text-xl font-bold text-zinc-200">Виджет Now Playing</h3>
          <p class="text-sm text-zinc-400 leading-relaxed max-w-md">
            Транслируй то, что слушаешь прямо сейчас. Полная синхронизация через Last.fm с кастомизацией шрифтов, обложек и анимаций.
          </p>
        </div>
        <div class="mt-6 flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <span>Status: Active</span>
          <span class="text-zinc-700">•</span>
          <span>128 BPM Sync ready</span>
        </div>
      </div>

      <!-- Фича 2: Минималистичный чат -->
      <div class="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl flex flex-col justify-between backdrop-blur-sm group hover:border-zinc-700/60 transition-colors">
        <div class="space-y-2">
          <div class="text-purple-400 font-bold text-xs uppercase tracking-wider">Интерактив</div>
          <h3 class="text-xl font-bold text-zinc-200">Стрим-чат</h3>
          <p class="text-sm text-zinc-400 leading-relaxed">
            Чистый, легко читаемый оверлей чата для OBS поверх игры с гибкой настройкой отображения баджей.
          </p>
        </div>
        <div class="mt-6 text-xs text-zinc-500 font-mono">
          <span>Twitch API Integration</span>
        </div>
      </div>

      <!-- Фича 3: Полная кастомизация -->
      <div class="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl flex flex-col justify-between backdrop-blur-sm group hover:border-zinc-700/60 transition-colors">
        <div class="space-y-2">
          <div class="text-amber-400 font-bold text-xs uppercase tracking-wider">Дизайн</div>
          <h3 class="text-xl font-bold text-zinc-200">Живой превью</h3>
          <p class="text-sm text-zinc-400 leading-relaxed">
            Меняй цвета, прозрачность и стили в админке и мгновенно наблюдай за результатом перед добавлением в OBS.
          </p>
        </div>
        <div class="mt-6 text-xs text-zinc-500 font-mono">
          <span>Real-time defineModel() v-model</span>
        </div>
      </div>

      <!-- Фича 4: OBS Browser Source -->
      <div class="md:col-span-2 p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl flex flex-col justify-between backdrop-blur-sm group hover:border-zinc-700/60 transition-colors">
        <div class="space-y-2">
          <div class="text-lime-400 font-bold text-xs uppercase tracking-wider">Производительность</div>
          <h3 class="text-xl font-bold text-zinc-200">Оптимизировано под OBS Studio</h3>
          <p class="text-sm text-zinc-400 leading-relaxed">
            Никакого лишнего веса, разметки панели управления или тяжелых скриптов. OBS получает чистый, изолированный оверлей с поддержкой прозрачности.
          </p>
        </div>
        <div class="mt-6 text-xs text-zinc-500 font-mono">
          <span>Transparent background by default</span>
        </div>
      </div>

    </div>

    <!-- Футер -->
    <div class="mt-20 text-center text-xs text-zinc-600 font-mono relative z-10">
      &copy; 2026 OSDash. Все права защищены. Разработано для стримеров.
    </div>
  </div>
</template>