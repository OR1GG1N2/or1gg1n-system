// server/api/user/profile.get.ts
import { eq } from 'drizzle-orm';
import { users } from '@@/server/database/schema';


export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  
  if (!session.user?.id) {
    return { user: null };
  }
  
  const db = event.context.db;
  
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .get();
  
  if (!user) {
    return { user: null };
  }
  
  // Генерируем Gravatar если нет аватара
  let avatarUrl = user.avatar;

  
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: avatarUrl,
      discordId: user.discordId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
});