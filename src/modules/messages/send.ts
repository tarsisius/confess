import { html as render } from 'itty-router'
import { messages } from '@/database/schema'

const send = async (req: Request, env: Env) => {
  const formData = await req.formData()
  const message = formData.get('message') as string
  const user_id = formData.get('user_id') as string

  try {
    await env.__db_client!.insert(messages).values({
      text: message,
      userId: parseInt(user_id),
    })
  } catch (err) {
    return render('Error when send message', { status: 500 })
  }

  return render('Beautiful', { status: 200 })
}

export default send
