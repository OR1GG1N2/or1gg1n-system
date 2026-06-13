<!-- components/widgets/NowPlaying/WidgetSettings.vue -->
<script setup lang="ts">
const settings = defineModel<any>({ required: true })

// Готовые палитры для быстрой настройки
const presets = [
  { text: '#ffffff', accent: '#84cc16', label: 'Lime' },
  { text: '#f4f4f5', accent: '#a855f7', label: 'Purple' },
  { text: '#e4e4e7', accent: '#f43f5e', label: 'Rose' },
  { text: '#cdd6f4', accent: '#b4befe', label: 'Mocha' } // Catppuccin style
]

const applyPreset = (text: string, accent: string) => {
  settings.value.textColor = text
  settings.value.accentColor = accent
}
</script>

<template>
  <div class="space-y-5 text-sm">
    
    <!-- Быстрые пресеты -->
    <div class="space-y-2">
      <label class="text-xs font-bold text-zinc-500 uppercase tracking-wider">Готовые темы</label>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="p in presets" 
          :key="p.label"
          type="button"
          @click="applyPreset(p.text, p.accent)"
          class="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 hover:border-zinc-700 transition-colors"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <!-- Текст -->
    <div class="flex flex-col gap-1.5">
      <label class="text-zinc-300 font-medium">Цвет названия трека</label>
      <div class="flex gap-2">
        <input type="color" v-model="settings.textColor" class="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 cursor-pointer p-1" />
        <input type="text" v-model="settings.textColor" class="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-300 font-mono text-xs uppercase" />
      </div>
    </div>

    <!-- Акцент -->
    <div class="flex flex-col gap-1.5">
      <label class="text-zinc-300 font-medium">Цвет подзаголовка</label>
      <div class="flex gap-2">
        <input type="color" v-model="settings.accentColor" class="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 cursor-pointer p-1" />
        <input type="text" v-model="settings.accentColor" class="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-300 font-mono text-xs uppercase" />
      </div>
    </div>

    <!-- Тоглы -->
    <div class="pt-2 border-t border-zinc-800/60">
      <label class="flex items-center justify-between cursor-pointer py-1.5">
        <span class="text-zinc-300">Отображать обложку трека</span>
        <input type="checkbox" v-model="settings.showCover" class="rounded border-zinc-800 bg-zinc-950 text-lime-600 focus:ring-0 focus:ring-offset-0 h-4 w-4" />
      </label>
    </div>

  </div>
</template>