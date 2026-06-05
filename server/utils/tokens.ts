// server/utils/tokens.ts
import { randomBytes } from 'crypto';
import { eq, and, gt, gte, lte } from 'drizzle-orm';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { tokens, TokenType, type NewToken } from '@@/server/database/schema';

/**
 * Генерация случайного токена
 */
export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Создание API токена для пользователя
 */
export async function createApiToken(
  db: LibSQLDatabase<any>,
  userId: number,
  expiresInDays: number = 30
): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  const newToken: NewToken = {
    token,
    userId,
    type: TokenType.API,
    expiresAt,
    isUsed: false,
  };

  await db.insert(tokens).values(newToken);
  return token;
}

/**
 * Проверка API токена
 */
export async function verifyApiToken(
  db: LibSQLDatabase<any>,
  token: string
): Promise<{ userId: number } | null> {
  const now = new Date();
  
  const result = await db
    .select()
    .from(tokens)
    .where(
      and(
        eq(tokens.token, token),
        eq(tokens.type, TokenType.API),
        eq(tokens.isUsed, false),
        gt(tokens.expiresAt, now)
      )
    )
    .limit(1)
    .get();

  if (!result) {
    return null;
  }

  return { userId: result.userId };
}

/**
 * Удаление/отзыв токена
 */
export async function revokeToken(
  db: LibSQLDatabase<any>,
  token: string
): Promise<void> {
  await db
    .update(tokens)
    .set({ isUsed: true })
    .where(eq(tokens.token, token));
}

/**
 * Удаление всех токенов пользователя
 */
export async function revokeAllUserTokens(
  db: LibSQLDatabase<any>,
  userId: number
): Promise<void> {
  await db
    .update(tokens)
    .set({ isUsed: true })
    .where(eq(tokens.userId, userId));
}

/**
 * Очистка просроченных токенов
 */
export async function cleanupExpiredTokens(
  db: LibSQLDatabase<any>
): Promise<void> {
  const now = new Date();
  await db
    .delete(tokens)
    .where(lte(tokens.expiresAt, now));
}