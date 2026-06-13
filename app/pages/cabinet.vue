<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const { loggedIn, user: sessionUser, clear, fetch } = useUserSession();
const router = useRouter();

const user = ref<any>(null);
const loading = ref(true);
const activeTab = ref('dashboard');
const showSettings = ref(false);
const updating = ref(false);

const editForm = ref({ name: '', email: '', newPassword: '', avatar: '' });

// Моковые данные стримера
const streamStats = ref({
  revenue: 1450,
  followers: 124,
  subs: 12,
  overlayUrl: 'https://api.yourservice.com/v1/widget/12345-abcde'
});

const recentEvents = ref([
  { id: 1, type: 'donation', user: 'Alexey_Pro', amount: '500 ₽', time: '2 мин назад', icon: 'i-heroicons-currency-dollar', color: 'text-green-400' },
  { id: 2, type: 'sub', user: 'GamerGirl99', amount: 'Tier 1', time: '15 мин назад', icon: 'i-heroicons-star', color: 'text-purple-400' },
  { id: 3, type: 'follow', user: 'NoobMaster', amount: '', time: '1 час назад', icon: 'i-heroicons-user-plus', color: 'text-blue-400' }
]);

const loadUserData = async () => {
  if (!sessionUser.value?.id) {
    loading.value = false; return;
  }
  try {
    const response = await $fetch('/api/user/profile');
    user.value = response.user;
    editForm.value = { ...user.value, newPassword: '' };
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  updating.value = true;
  try {
    const response = await $fetch('/api/user/update', { method: 'PUT', body: editForm.value });
    user.value = response.user;
    await fetch();
    showSettings.value = false;
  } catch (err) {
    console.error(err);
  } finally {
    updating.value = false;
  }
};

const copyOverlayUrl = () => {
  navigator.clipboard.writeText(streamStats.value.overlayUrl);
  alert('Ссылка скопирована!');
};

const handleLogout = async () => {
  await $fetch('/api/auth/logout');
  await clear();
  await fetch();
  await router.push('/');
};

onMounted(() => {
  loggedIn.value ? loadUserData() : (loading.value = false);
});

// Навигация для UVerticalNavigation
const navLinks = computed(() => [
  [
    { label: 'Сводка', icon: 'i-heroicons-chart-bar', click: () => activeTab.value = 'dashboard' },
    { label: 'Алерты', icon: 'i-heroicons-bell', click: () => activeTab.value = 'alerts' },
    { label: 'Оверлеи', icon: 'i-heroicons-paint-brush', click: () => activeTab.value = 'overlays' },
    { label: 'Чат-бот', icon: 'i-heroicons-chat-bubble-left-ellipsis', click: () => activeTab.value = 'bot' },
    { label: 'Донаты', icon: 'i-heroicons-banknotes', click: () => activeTab.value = 'donations' }
  ],
  [
    { label: 'Настройки', icon: 'i-heroicons-cog-8-tooth', click: () => showSettings.value = true },
    { label: 'Выйти', icon: 'i-heroicons-arrow-left-on-rectangle', click: handleLogout }
  ]
]);
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
    <UContainer>
      <div v-if="loading" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary" />
      </div>

      <div v-else-if="user" class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        <!-- Сайдбар -->
        <div class="lg:col-span-1 space-y-4">
          <UCard :ui="{ body: { padding: 'p-4' } }">
            <div class="flex items-center gap-3">
              <UAvatar :src="user.avatar || 'https://placehold.net/avatar-2.svg'" size="lg" />
              <div class="overflow-hidden">
                <div class="font-semibold truncate">{{ user.name || 'Стример' }}</div>
                <div class="text-xs text-green-400 flex items-center gap-1">
                  <UIcon name="i-heroicons-signal" /> Online
                </div>
              </div>
            </div>
          </UCard>

          <UCard :ui="{ body: { padding: 'p-2' } }">
            <UVerticalNavigation :links="navLinks" />
          </UCard>
        </div>

        <!-- Рабочая область -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Шапка -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 class="text-2xl font-bold">Сводка канала</h1>
              <p class="text-sm text-gray-400">Статистика за текущую сессию</p>
            </div>
            
            <!-- Ссылка на оверлей -->
            <UButtonGroup size="sm" orientation="horizontal">
              <UButton color="gray" variant="solid" label="URL Оверлея:" class="pointer-events-none" />
              <UInput v-model="streamStats.overlayUrl" type="password" readonly class="w-32 sm:w-48" />
              <UButton icon="i-heroicons-clipboard-document" color="primary" @click="copyOverlayUrl" />
            </UButtonGroup>
          </div>

          <!-- Метрики -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard>
              <template #header>
                <div class="text-sm font-medium text-gray-400">Донаты (сегодня)</div>
              </template>
              <div class="text-3xl font-bold text-green-400">{{ streamStats.revenue }} ₽</div>
            </UCard>

            <UCard>
              <template #header>
                <div class="text-sm font-medium text-gray-400">Новые фолловеры</div>
              </template>
              <div class="text-3xl font-bold text-blue-400">+{{ streamStats.followers }}</div>
            </UCard>

            <UCard>
              <template #header>
                <div class="text-sm font-medium text-gray-400">Новые сабы</div>
              </template>
              <div class="text-3xl font-bold text-purple-400">+{{ streamStats.subs }}</div>
            </UCard>
          </div>

          <!-- Лента событий и график -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <UCard class="lg:col-span-1" :ui="{ body: { padding: 'p-0' } }">
              <template #header>
                <div class="flex justify-between items-center">
                  <span class="font-semibold">Лента событий</span>
                  <UButton size="xs" color="gray" variant="ghost">Пауза</UButton>
                </div>
              </template>
              
              <div class="h-[300px] overflow-y-auto p-2 space-y-1">
                <div v-for="event in recentEvents" :key="event.id" class="p-3 hover:bg-gray-800 rounded-lg flex justify-between items-start transition-colors">
                  <div class="flex gap-3">
                    <UIcon :name="event.icon" :class="[event.color, 'text-xl']" />
                    <div>
                      <div class="text-sm font-medium">{{ event.user }}</div>
                      <div class="text-xs text-gray-400">{{ event.amount || 'Подписался' }}</div>
                    </div>
                  </div>
                  <span class="text-[10px] text-gray-500">{{ event.time }}</span>
                </div>
              </div>
            </UCard>

            <UCard class="lg:col-span-2 flex items-center justify-center min-h-[300px]">
              <div class="text-center text-gray-500">
                <UIcon name="i-heroicons-presentation-chart-line" class="text-5xl mb-2 mx-auto" />
                <p class="text-sm">График активности (место для графика)</p>
              </div>
            </UCard>
          </div>

        </div>
      </div>
    </UContainer>

    <!-- Модалка настроек -->
    <UModal v-model="showSettings">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Настройки профиля</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="showSettings = false" />
          </div>
        </template>

        <form @submit.prevent="updateProfile" class="space-y-4">
          <UFormGroup label="Имя">
            <UInput v-model="editForm.name" />
          </UFormGroup>
          <UFormGroup label="Email">
            <UInput v-model="editForm.email" type="email" />
          </UFormGroup>
          <UFormGroup label="Новый пароль" hint="Оставь пустым, если не меняешь">
            <UInput v-model="editForm.newPassword" type="password" />
          </UFormGroup>
          <UFormGroup label="URL Аватара">
            <UInput v-model="editForm.avatar" />
          </UFormGroup>

          <div class="flex justify-end gap-3 pt-4">
            <UButton color="gray" variant="soft" @click="showSettings = false">Отмена</UButton>
            <UButton type="submit" color="primary" :loading="updating">Сохранить</UButton>
          </div>
        </form>
      </UCard>
    </UModal>
  </div>
</template>