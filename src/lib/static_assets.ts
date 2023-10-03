import {
  MethodNotAllowedError,
  NotFoundError,
  getAssetFromKV,
} from '@cloudflare/kv-asset-handler'

// @ts-ignore
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const assetHandler = async ({
  env,
  req,
  ctx,
}: {
  env: Env
  req: Request
  ctx: ExecutionContext
}) => {
  const createErrorResponse = (status: number, message: string): Response => {
    return new Response(message, { status })
  }

  const fetchAndHandleAsset = async (assetUrl: string): Promise<Response> => {
    try {
      const response = await getAssetFromKV(
        {
          request: new Request(assetUrl),
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: JSON.parse(manifestJSON),
        }
      )

      return response
    } catch (e) {
      if (e instanceof NotFoundError) {
        return createErrorResponse(404, 'Not found')
      } else if (e instanceof MethodNotAllowedError) {
        return createErrorResponse(405, 'Method not allowed')
      } else {
        return createErrorResponse(500, 'An unexpected error occurred')
      }
    }
  }

  const url = new URL(req.url)
  const assetUrl = `https://${url.hostname}${url.pathname}`

  if (req.url.includes('/favicon.ico') || req.url.includes('/public/')) {
    return await fetchAndHandleAsset(assetUrl)
  }
}

export default assetHandler
