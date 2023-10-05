import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/database/schema'

const initDbClient = (env: Env) => {
  if (!env.__db_client) {
    const client = createClient({
      url: env.DB_URL,
      authToken: env.DB_AUTH_TOKEN!,
    })
    const db = drizzle(client, { schema })
    env.__db_client = db
  }
}
export default initDbClient
