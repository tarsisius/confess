import { Router, error } from 'itty-router'
import { assetsHandler } from '@/lib/static_assets'
import { handler } from '@/worker_routes'
import initDbClient from '@/database/client'

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    if (!env.__router) {
      const router = Router({ base: '/' })

      if (!env.__db_client) {
        initDbClient(env)
      }

      const statics = ['/favicon.ico', '/public/*']

      for (const staticPath of statics) {
        router.get(staticPath, assetsHandler)
      }

      router.all('*', handler)
      router.all('*', () => error(404, 'Not Found'))

      env.__router = router
    }

    return env.__router.handle(req, env, ctx)
  },
}
