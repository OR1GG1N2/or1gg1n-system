<!-- pages/w/[id].vue -->
<script setup lang="ts">
// Импортируем сами компоненты напрямую
import WidgetsNowPlayingCore from '~/components/widgets/NowPlaying/Core.vue' 
// Если файлы не переименовывал, то путь будет: '~/components/widgets/NowPlaying/WidgetCore.vue'

definePageMeta({
  layout: 'overlay'
})

const route = useRoute()
const { data: widget } = await useFetch<any>(`/api/widgets/render/${route.params.id}`)

// Мапим тип не на строку, а прямо на импортированный объект компонента
const widgetComponents: Record<string, any> = {
  lastfm: WidgetsNowPlayingCore
}
</script>

<template>
  <div v-if="widget && widgetComponents[widget.type]" class="p-4">
    <!-- Теперь Vue гарантированно отрендерит компонент, так как имеет на него прямую ссылку -->
    <component 
      :is="widgetComponents[widget.type]" 
      :config="widget.settings" 
    />
  </div>
</template>