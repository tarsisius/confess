import { messages } from '@/database/schema'

const send = async ({ env, req }: { env: Env; req: Request }) => {
  const formData = await req.formData()
  const message = formData.get('message') as string
  const user_id = formData.get('user_id') as string

  try {
    await env.__db_client!.insert(messages).values({
      text: message,
      userId: parseInt(user_id),
    })
  } catch (err) {
    return new Response('Error when send message', {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
      status: 500,
    })
  }

  return new Response('Success send message', {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}

export default send
