import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_AUTH_TOKEN,
  },
  out: './migrations',
  schema: './src/database/schema.ts',
  breakpoints: true,
  driver: 'turso',
} satisfies Config
