import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
// @ts-ignore
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const importAssets = async (req: Request, env: Env, ctx: ExecutionContext) => {
  return await getAssetFromKV(
    {
      request: req,
      waitUntil: function (promise) {
        ctx.waitUntil(promise)
      },
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: JSON.parse(manifestJSON),
    }
  )
}

const assetsHandler = async (req: Request, env: Env, ctx: ExecutionContext) => {
  const url = new URL(req.url)

  const assetUrl = `https://${url.hostname}${url.pathname}`
  const response = await importAssets(new Request(assetUrl), env, ctx)
  if (response && response.status >= 200 && response.status < 400) {
    return response
  }

  return new Response('Not found', {
    status: 404,
  })
}

export { assetsHandler }
