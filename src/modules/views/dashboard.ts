import { parse } from 'cookie'
import { eq } from 'drizzle-orm'
import { html, verifyJwtToken } from '@/lib/utils'
import { users } from '@/database/schema'
import baseLayout from '@/www/layouts/base'
import copyURL from '@/www/components/copy_url'
import messages from '@/www/components/messages'

const viewDash = async ({ env, req }: { env: Env; req: Request }) => {
  const cookie = parse(req.headers.get('Cookie') || '')

  const token = cookie['__token']
  const data = await verifyJwtToken(token)

  if (!data) {
    return Response.redirect(env.HOST, 301)
  }

  const userData = await env.__db_client!.query.users.findFirst({
    where: eq(users.url, data.url),
    with: {
      messages: {
        columns: {
          userId: false,
        },
        orderBy: (messages, { desc }) => [desc(messages.createdAt)],
      },
    },
  })

  if (!userData) {
    return Response.redirect(env.HOST, 301)
  }

  const p = html`
    <div class="${"mx-auto w-full max-w-md"}">
      <div class="flex flex-col space-y-4 py-4">
        <label class="font-semibold" for="name_input">
          Your Name:
          <span class="underline underline-gray-600">${data.name}</span>
        </label>
        <p class="text-sm text-gray-600">This is your profile link:</p>
        ${copyURL(`${env.HOST}/to/${data.url}`)}
        ${messages(userData.messages)}
      </div>
    </div>
  `
  
  return new Response(baseLayout(p), {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}

export default viewDash
