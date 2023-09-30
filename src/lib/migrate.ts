import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import { migrate as mg } from 'drizzle-orm/libsql/migrator'
import * as schema from '@/database/schema'

const migrate = async (dbClient: LibSQLDatabase<typeof schema>): Promise<void> => {
  await mg(dbClient, { migrationsFolder: './migrations' })
}

export default migrate
