<!-- components/widgets/NowPlaying/WidgetCore.vue -->
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  config: {
    textColor: string
    accentColor: string
    showCover: boolean
  }
}

defineProps<Props>()

// Мок-данные текущего трека (сюда потом прикрутишь WebSocket / SSE события)
const track = ref({
  title: 'Mocha Dream',
  artist: 'Catppuccin Lo-Fi',
  cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=120&auto=format&fit=crop'
})
</script>

<template>
  <div 
    class="flex items-center gap-3.5 p-3 bg-zinc-950/75 border border-zinc-800/60 backdrop-blur-md rounded-xl max-w-[280px] w-full transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
  >
    <!-- Обложка альбома -->
    <div 
      v-if="config.showCover" 
      class="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden border border-zinc-800/40"
    >
      <img :src="track.cover" alt="Album Art" class="h-full w-full object-cover" />
    </div>

    <!-- Метаданные трека -->
    <div class="flex-1 min-w-0">
      <span 
        class="text-[10px] font-bold uppercase tracking-wider block mb-0.5"
        :style="{ color: config.accentColor || '#84cc16' }"
      >
        Сейчас играет
      </span>
      <h4 
        class="font-bold truncate text-sm leading-tight"
        :style="{ color: config.textColor || '#f4f4f5' }"
      >
        {{ track.title }}
      </h4>
      <p class="text-xs text-zinc-400 truncate mt-0.5">
        {{ track.artist }}
      </p>
    </div>
  </div>
</template>