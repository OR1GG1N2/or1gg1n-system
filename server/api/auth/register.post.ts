// server/api/auth/register.post.ts
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { users } from '@@/server/database/schema';
import bcrypt from 'bcrypt';
// Не импортируем hashPassword - она глобальная

const registerSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
  name: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  console.log('=== REGISTER ATTEMPT ===');
  
  const body = await readValidatedBody(event, registerSchema.parse);
  console.log('Register body:', { email: body.email, name: body.name });
  
  const db = event.context.db;
  
  // Проверяем существующего пользователя
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email))
    .get();
  
  if (existingUser) {
    console.log('ERROR: User already exists');
    throw createError({
      statusCode: 400,
      statusMessage: 'Пользователь с таким email уже существует',
    });
  }
  
  // Хэшируем пароль (используем глобальную hashPassword из nuxt-auth-utils)
const saltRounds = 12; // Оптимальный баланс безопасности и скорости
const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  
  // Создаем пользователя
  console.log('Creating user...');
  const newUser = await db
    .insert(users)
    .values({
      email: body.email,
      password: hashedPassword,
      name: body.name || null,
    })
    .returning();
  
  if (newUser && newUser[0]) {
    console.log('User created successfully, ID:', newUser[0].id);
    
    // Устанавливаем сессию
    await setUserSession(event, {
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
      },
      loggedInAt: new Date(),
    });
    
    console.log('Session set for user');
    
    return { 
      message: 'Регистрация успешна',
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
      }
    };
  }
  
  console.log('ERROR: Failed to create user');
  throw createError({
    statusCode: 500,
    statusMessage: 'Не удалось создать пользователя',
  });
});