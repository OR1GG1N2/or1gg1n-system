<template>
  <div class="w-full min-h-screen bg-[#02140a] relative overflow-hidden font-inter selection:bg-green-500/30">
    
    <!-- Фоновый слой -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/grok-a1f891f5-3f28-4135-863c-4a37b7674002.jpg" 
        alt="Or1GG1n Background" 
        class="w-full h-full object-cover object-center md:object-right"
      />
      <div class="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#02140a] via-[#02140a]/90 to-transparent md:via-[#02140a]/70 z-0"></div>
      <div class="absolute inset-0 z-0 opacity-10" style="background-image: linear-gradient(to right, rgba(74, 222, 128, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(74, 222, 128, 0.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <!-- КОНТЕНТ -->
    <main class="relative z-10 w-full min-h-screen flex flex-col justify-between py-8 md:py-16">
      
      <!-- ВЕРХНЯЯ ПАНЕЛЬ -->
      <Header/>

      <!-- ЦЕНТРАЛЬНАЯ СЕТКА -->
      <div class="w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 flex-grow items-center pt-20 md:pt-0">
        
        <!-- ЛЕВАЯ КОЛОНКА (Текст и инфо) -->
        <div class="md:col-span-8 lg:col-span-7 space-y-8 md:space-y-12">
          
          <h1 class="text-5xl sm:text-7xl lg:text-9xl font-unbounded font-black tracking-tighter leading-none">
            <span class="text-transparent bg-clip-text bg-gradient-to-b from-green-100 via-green-300 to-green-600 filter drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              Or1GG1n
            </span>
          </h1>

          <!-- Аккуратная карточка о себе -->
          <div class="max-w-xl bg-[#022c22]/30 border border-green-500/10 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-xl">
            <p class="text-green-100/90 text-base md:text-lg leading-relaxed font-inter">
              Junior Software Engineer из Киева. Фокус на <span class="text-green-400 font-medium">Vue 3, Nuxt и железе (ESP32)</span>. 
              Сейчас активно разрабатываю <span class="text-green-400 font-medium">OSDash</span> для автоматизации стримов.
            </p>
          </div>
        </div>

        <!-- ПРАВАЯ КОЛОНКА (Соцсети) -->
        <div class="md:col-span-4 lg:col-span-5 flex flex-col justify-end space-y-6 h-full md:pb-12 md:items-end">
          <h4 class="text-green-500/70 text-xs font-semibold uppercase tracking-widest hidden md:block">Connect</h4>
          
          <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <!-- GitHub -->
            <a href="#" class="flex items-center md:justify-center gap-4 p-4 md:p-0 md:w-12 md:h-12 rounded-xl md:rounded-full bg-[#022c22]/50 border border-green-500/20 text-green-300 hover:bg-green-500 hover:text-[#02140a] transition-all backdrop-blur-sm group">
              <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span class="font-semibold text-sm md:hidden">GitHub</span>
            </a>
            
            <!-- Telegram -->
            <a href="#" class="flex items-center md:justify-center gap-4 p-4 md:p-0 md:w-12 md:h-12 rounded-xl md:rounded-full bg-[#022c22]/50 border border-green-500/20 text-green-300 hover:bg-green-500 hover:text-[#02140a] transition-all backdrop-blur-sm group">
              <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              <span class="font-semibold text-sm md:hidden">Telegram</span>
            </a>

            <!-- Twitch -->
            <a href="#" class="flex items-center md:justify-center gap-4 p-4 md:p-0 md:w-12 md:h-12 rounded-xl md:rounded-full bg-[#022c22]/50 border border-green-500/20 text-green-300 hover:bg-green-500 hover:text-[#02140a] transition-all backdrop-blur-sm group">
              <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.806-6.806v-14.149h-21.851zm19.164 13.612l-4.119 4.119h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.731v10.926zm-2.866-6.268v5.373h-2.149v-5.373h2.149zm-5.015 0v5.373h-2.149v-5.373h2.149z"/></svg>
              <span class="font-semibold text-sm md:hidden">Twitch</span>
            </a>
          </div>
        </div>

      </div>

      <!-- НИЖНЯЯ ПАНЕЛЬ -->
      <footer class="w-full px-6 md:px-16 mt-8 flex items-center justify-between">
        <div class="text-green-100/30 text-xs font-mono">SYS_CORE v1.1 // 2026</div>
      </footer>

    </main>
  </div>
</template>

<script setup>
import Header from './Header.vue';
</script>

<style scoped>
.font-unbounded { 
  font-family: 'Unbounded', sans-serif; 
}
.font-inter {
  font-family: 'Inter', sans-serif;
}
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}
/* Скрываем скроллбар для горизонтального скролла на мобилках */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>