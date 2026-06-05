// server/plugins/drizzle.ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../database/schema';

export default defineNitroPlugin((nitroApp) => {
  // Используем переменные окружения для Turso
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  
  if (!url) {
    console.error('❌ TURSO_DATABASE_URL is not set in environment variables');
    return;
  }
  
  // Создаем клиент Turso (НЕ better-sqlite3!)
  const client = createClient({
    url,
    authToken: authToken || undefined,
  });
  
  // Создаем экземпляр Drizzle с Turso клиентом
  const db = drizzle(client, { schema });
  
  // Добавляем db в контекст каждого запроса
  nitroApp.hooks.hook('request', (event) => {
    event.context.db = db;
  });
  
  console.log('✅ Turso database connected');
});