import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from '@/database/schema'

const initDbClient = (env: Env) => {
  const options = {
    local: { url: 'file:local.sqlite' },
    remote: {
      url: env.DB_URL,
      authToken: env.DB_AUTH_TOKEN!,
    },
    'local-replica': {
      url: 'file:local.sqlite',
      syncUrl: env.DB_URL,
      authToken: env.DB_AUTH_TOKEN!,
    },
  }

  if (!env.__db_client) {
    const client = createClient(options[env.DB_CONNECTION_TYPE])
    const db = drizzle(client, { schema })
    env.__db_client = db
  }

  return env.__db_client
}
export default initDbClient
