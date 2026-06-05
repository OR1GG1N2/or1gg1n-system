// server/api/user/update.put.ts
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { users } from '@@/server/database/schema';

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  newPassword: z.string().min(6).optional(),
});

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const body = await readValidatedBody(event, updateSchema.parse);
  const db = event.context.db;
  
  // Проверяем, не занят ли email другим пользователем
  if (body.email && body.email !== session.user.email) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email))
      .get();
    
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email уже используется другим пользователем',
      });
    }
  }
  
  // Готовим данные для обновления
  const updateData: any = {};
  
  if (body.name !== undefined) {
    updateData.name = body.name;
  }
  
  if (body.email !== undefined) {
    updateData.email = body.email;
  }
  
  if (body.newPassword) {
    updateData.password = await hashPassword(body.newPassword);
  }
  
  // Обновляем пользователя
  if (Object.keys(updateData).length > 0) {
    updateData.updatedAt = new Date();
    
    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, session.user.id));
  }
  
  // Обновляем сессию
  if (body.email !== undefined || body.name !== undefined) {
    await setUserSession(event, {
      user: {
        id: session.user.id,
        email: body.email || session.user.email,
        name: body.name !== undefined ? body.name : session.user.name,
      },
      updatedAt: new Date(),
    });
  }
  
  // Получаем обновленного пользователя
  const updatedUser = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .get();
  
  return {
    message: 'Профиль успешно обновлен',
    user: updatedUser,
  };
});