<template>
  <header class="fixed top-0 inset-x-0 z-[100] flex justify-center mt-4 sm:mt-6 px-4 pointer-events-none font-inter">
    <div class="pointer-events-auto bg-[#02140a]/60 backdrop-blur-xl border border-green-500/10 shadow-2xl rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-between transition-all w-full max-w-4xl relative">
      
      <!-- ЛЕВАЯ ЧАСТЬ (Лого или иконка) -->
      <router-link to="/" class="flex items-center gap-2 group sm:hidden">
        <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500/40 transition">
          <i class="fas fa-cat"></i>
        </div>
      </router-link>

      <!-- НАВИГАЦИЯ ДЛЯ ДЕСКТОПА И ПЛАНШЕТА -->
      <nav class="hidden sm:flex items-center gap-1 md:gap-2 w-full justify-center">
        <router-link to="/" class="px-4 py-2 rounded-full text-xs md:text-sm font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" exact-active-class="!text-green-400 !bg-green-500/10 font-bold shadow-[inset_0_1px_1px_rgba(34,197,94,0.1)]">Home</router-link>
        <router-link to="/blog" class="px-4 py-2 rounded-full text-xs md:text-sm font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" active-class="!text-green-400 !bg-green-500/10 font-bold shadow-[inset_0_1px_1px_rgba(34,197,94,0.1)]">Blog</router-link>
        <router-link to="/wiki" class="px-4 py-2 rounded-full text-xs md:text-sm font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" active-class="!text-green-400 !bg-green-500/10 font-bold shadow-[inset_0_1px_1px_rgba(34,197,94,0.1)]">Wiki</router-link>
        <router-link to="/about" class="px-4 py-2 rounded-full text-xs md:text-sm font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" active-class="!text-green-400 !bg-green-500/10 font-bold shadow-[inset_0_1px_1px_rgba(34,197,94,0.1)]">About</router-link>
        <a href="https://github.com/0riggin" target="_blank" class="px-4 py-2 rounded-full text-xs md:text-sm font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all">
          GitHub <i class="fas fa-external-link-alt text-[10px] ml-1 opacity-50"></i>
        </a>
      </nav>

      <!-- МОБИЛЬНАЯ КНОПКА (Гамбургер) -->
      <div class="flex sm:hidden items-center relative z-50">
        <button @click="isMenuOpen = !isMenuOpen" class="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/5 hover:bg-green-500/20 border border-green-500/10 transition text-green-100 relative pointer-events-auto" aria-label="Меню">
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-sm"></i>
        </button>
      </div>

      <!-- НЕВИДИМЫЙ ФОН ДЛЯ ЗАКРЫТИЯ МЕНЮ -->
      <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 z-[-1] sm:hidden"></div>

      <!-- МОБИЛЬНОЕ МЕНЮ (Выпадашка) -->
      <transition name="fade-slide">
        <nav v-if="isMenuOpen" class="absolute top-[calc(100%+1rem)] left-0 right-0 bg-[#022c22]/95 backdrop-blur-3xl border border-green-500/20 rounded-3xl p-3 flex flex-col gap-1 shadow-2xl sm:hidden pointer-events-auto overflow-hidden">
          <router-link to="/" class="flex items-center px-4 py-3 rounded-2xl text-base font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" exact-active-class="!text-green-400 !bg-green-500/10 font-bold mobile-active" @click="isMenuOpen = false">
            <div class="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3 transition-colors"><i class="fas fa-home"></i></div> Home
          </router-link>
          <router-link to="/blog" class="flex items-center px-4 py-3 rounded-2xl text-base font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" active-class="!text-green-400 !bg-green-500/10 font-bold mobile-active" @click="isMenuOpen = false">
            <div class="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3 transition-colors"><i class="fas fa-layer-group"></i></div> Blog
          </router-link>
          <router-link to="/wiki" class="flex items-center px-4 py-3 rounded-2xl text-base font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" active-class="!text-green-400 !bg-green-500/10 font-bold mobile-active" @click="isMenuOpen = false">
            <div class="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3 transition-colors"><i class="fas fa-book"></i></div> Wiki
          </router-link>
          <router-link to="/about" class="flex items-center px-4 py-3 rounded-2xl text-base font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" active-class="!text-green-400 !bg-green-500/10 font-bold mobile-active" @click="isMenuOpen = false">
            <div class="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3 transition-colors"><i class="fas fa-cat"></i></div> About
          </router-link>
          <a href="https://github.com/0riggin" target="_blank" class="flex items-center px-4 py-3 rounded-2xl text-base font-medium text-green-100/80 hover:text-green-100 hover:bg-green-500/10 transition-all" @click="isMenuOpen = false">
            <div class="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3 transition-colors"><i class="fab fa-github"></i></div> GitHub
          </a>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts" >
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/nuxt-fontawesome@0.4.0/lib/module.min.js');

.font-inter {
  font-family: 'Inter', sans-serif;
}

.mobile-active div {
  background-color: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.95);
}
</style>