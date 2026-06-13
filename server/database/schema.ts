// server/database/schema.ts
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Таблица пользователей
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  name: text('name'),
  isEmailVerified: integer('is_email_verified', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  discordId: text('discord_id').unique(),
  avatar: text('avatar'),
});

export const admins = sqliteTable('admins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  adminLevel: integer('admin_level').default(0).notNull(), // 1 - обычный админ, 2 - супер админ
  adminpassword: text('admin_password').notNull(), // Пароль для доступа к админке
});
// Таблица для токенов
export const tokens = sqliteTable('tokens', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  token: text('token').unique().notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: text('type').notNull(), // 'api', 'refresh', 'email_verification', 'password_reset'
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  isUsed: integer('is_used', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export const integrations = sqliteTable('integrations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  provider: text('provider').notNull(), // например: 'twitch', 'spotify', 'youtube'
  providerUserId: text('provider_user_id'), // ID пользователя в самом сервисе (например, Twitch ID)
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token'),
  scopes: text('scopes'), // права доступа через запятую, если нужно
  expiresAt: integer('expires_at', { mode: 'timestamp' }), // время жизни access токена
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Integration = typeof integrations.$inferSelect;
export type NewIntegration = typeof integrations.$inferInsert;

// Типы
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Token = typeof tokens.$inferSelect;
export type NewToken = typeof tokens.$inferInsert;

// Типы токенов
export const TokenType = {
  API: 'api',
  REFRESH: 'refresh',
  EMAIL_VERIFICATION: 'email_verification',
  PASSWORD_RESET: 'password_reset',
} as const;

export type TokenType = typeof TokenType[keyof typeof TokenType];