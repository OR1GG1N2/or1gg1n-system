// server/api/auth/login.post.ts
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { users } from '@@/server/database/schema';
// Не импортируем verifyPassword - она глобальная
import bcrypt from 'bcrypt';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  console.log('=== LOGIN ATTEMPT ===');
  console.log('ENV CHECK:', process.env.NUXT_SESSION_PASSWORD?.substring(0, 5));
  const body = await readValidatedBody(event, (data) => loginSchema.parse(data));
  console.log('Login body:', { email: body.email, passwordLength: body.password.length });
  
  const db = event.context.db;
  
  // Ищем пользователя
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email))
    .get();
  
  console.log('User found:', user ? 'YES' : 'NO');
  
  if (!user) {
    console.log('ERROR: User not found');
    throw createError({
      statusCode: 401,
      statusMessage: 'Неверные учетные данные',
    });
  }
  
  console.log('User email:', user.email);
  console.log('Stored password hash (first 20 chars):', user.password.substring(0, 20) + '...');
  
  // Проверяем пароль (используем глобальную verifyPassword из nuxt-auth-utils)
  console.log('Verifying password with scrypt...');
  const isValid = await bcrypt.compare(body.password, user.password);
  console.log('Password valid:', isValid);
  
  if (!isValid) {
    console.log('ERROR: Invalid password');
    throw createError({
      statusCode: 401,
      statusMessage: 'Неверные учетные данные',
    });
  }
  
  console.log('Login successful!');
  
  // Устанавливаем сессию
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    loggedInAt: new Date(),
  });
  
  console.log('Session set for user:', user.id);
  
  return { 
    message: 'Вход выполнен успешно',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  };
});