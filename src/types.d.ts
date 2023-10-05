import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import type { Router } from '@tsndr/cloudflare-worker-router'
import * as schema from '@/database/schema'

declare global {
  interface Env {
    __STATIC_CONTENT: KVNamespace
    __router?: Router
    __db_client?: LibSQLDatabase<typeof schema>
    DB_URL: string
    DB_AUTH_TOKEN: string
    HOST: string
  }

  interface IRequest extends Request {
    params: Record<string, string>
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
}
