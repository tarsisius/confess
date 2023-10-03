import { Router } from '@tsndr/cloudflare-worker-router'
import initDbClient from '@/database/client'
import assetsHandler from '@/lib/static_assets'
import registerUser from '@/modules/users/register'
import viewHome from '@/modules/views/home'
import viewDashboard from '@/modules/views/dashboard'
import viewConfess from '@/modules/views/confess'
import sendMessage from '@/modules/messages/send'

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    if (!env.__db_client) {
      initDbClient(env)
    }

    if (!env.__router) {
      const r = new Router()

      r.use(assetsHandler)

      r.post('/api/register-user', registerUser)
      r.post('/api/send-message', sendMessage)

      r.get('/', viewHome)
      r.get('/dash', viewDashboard)

      r.get('/to/:url', viewConfess)

      r.any('*', () => {
        return Response.json({ error: 'Not found!' }, { status: 404 })
      })

      env.__router = r
    }

    return env.__router.handle(req, env, ctx)
  },
}
