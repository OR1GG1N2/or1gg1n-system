// server/types/database.d.ts
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import type * as schema from '../database/schema';

declare module 'h3' {
  interface H3EventContext {
    db: LibSQLDatabase<typeof schema>;
  }
}