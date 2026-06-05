// server/plugins/turso.ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../database/schema';

export default defineNitroPlugin((nitroApp) => {
  // Получаем конфигурацию из runtimeConfig
  const config = useRuntimeConfig();
  
  const url = config.tursoDbUrl;
  const authToken = config.tursoAuthToken;
  
  if (!url) {
    console.error('❌ TURSO_DATABASE_URL is not set in environment variables');
    return;
  }
  
  // Создаем клиент Turso
  const client = createClient({
    url,
    authToken: authToken || undefined,
  });
  
  // Создаем экземпляр Drizzle
  const db = drizzle(client, { schema });
  
  // Добавляем db в контекст каждого запроса
  nitroApp.hooks.hook('request', (event) => {
    event.context.db = db;
  });
  
  console.log('✅ Turso database connected');
});