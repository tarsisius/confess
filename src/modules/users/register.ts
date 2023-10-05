import { customAlphabet } from 'nanoid'
import { users } from '@/database/schema'
import { getJwtToken } from '@/lib/utils'
import { serialize } from 'cookie'

const register = async ({ env, req }: { env: Env; req: Request }) => {
  const formData = await req.formData()

  const name = formData.get('name') as string
  const nanoid = customAlphabet('1234567890abcdef', 10)

  const url = nanoid()

  try {
    await env.__db_client!.insert(users).values({
      name,
      url,
    })
  } catch (err) {
    return new Response('Error when register user', {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 500,
    })
  }

  const token = await getJwtToken({ name, url })

  const cookie = serialize('__token', token, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 604800000,
  })

  return new Response(null, {
    headers: {
      'Set-Cookie': cookie,
      'Hx-Redirect': '/dash',
    },
    status: 302,
  })
}

export default register
