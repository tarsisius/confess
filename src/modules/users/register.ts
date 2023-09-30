import { html as render } from 'itty-router'
import { customAlphabet } from 'nanoid'
import { users } from '@/database/schema'
import { getJwtToken } from '@/lib/utils/jwt'
import { serialize } from 'cookie'

const register = async (req: Request, env: Env) => {
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
    return render('Error when register new user', { status: 500 })
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
