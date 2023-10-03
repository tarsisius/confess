import html from '@kitajs/html'
import { parse } from 'cookie'
import { eq } from 'drizzle-orm'
import { verifyJwtToken } from '@/lib/utils/jwt'
import { users } from '@/database/schema'
import Base from '@/www/layouts/base'
import Messages from '@/www/components/messages'
import CopyLink from '@/www/components/copy_link'

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
      },
    },
  })

  if (!userData) {
    return Response.redirect(env.HOST, 301)
  }

  const jsx = await (
    <Base>
      <div class='mx-auto w-full max-w-md'>
        <div class='flex flex-col space-y-4 py-4'>
          <label class='font-semibold' for='name_input'>
            Your Name:{' '}
            <span class='underline underline-gray-600'>{data.name}</span>
          </label>
          <p class='text-sm text-gray-600'>This is your profile link:</p>
          <CopyLink url={`${env.HOST}/to/${userData.url}`} />
          <Messages data={userData.messages} />
        </div>
      </div>
    </Base>
  )

  return new Response(jsx, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}

export default viewDash
