// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-06-05',
  devtools: { enabled: true },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },

  // Добавляем настройки Nitro для поддержки top-level await
  nitro: {
    esbuild: {
      options: {
        target: 'node20', // Поддержка современных фич Node.js
      }
    },
    // Настройка для Turso и работы с окружением
    runtimeConfig: {
      turso: {
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }
    }
  },

  // Настройки рантайма для доступа к переменным окружения на клиенте и сервере
  runtimeConfig: {
    // Приватные переменные (доступны только на сервере)
    tursoDbUrl: process.env.TURSO_DATABASE_URL,
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
    sessionPassword: process.env.NUXT_SESSION_PASSWORD,
    
    // Публичные переменные (доступны и на клиенте)
    public: {
      appName: 'Minecraft Server Manager',
    }
  },

  modules: ['nuxt-auth-utils', '@nuxtjs/tailwindcss']
})