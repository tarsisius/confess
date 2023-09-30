import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from '@/database/schema'

declare global {
  interface Env {
    HOST: string
    DB_URL: string
    DB_AUTH_TOKEN: string
    DB_CONNECTION_TYPE: 'local' | 'remote' | 'local-replica'
    __STATIC_CONTENT: KVNamespace
    __router?: RouterType
    __db_client?: LibSQLDatabase<typeof schema>
  }

  interface UserData {
    id: number
    name: string
    url: string
    createdAt: string
  }

  interface MessageData {
    id: number
    text: string
    createdAt: string
  }

  namespace JSX {
    interface HtmlTag extends Htmx.Attributes {
      _?: string
    }
  }
}
