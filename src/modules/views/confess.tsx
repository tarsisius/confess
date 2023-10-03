import html from '@kitajs/html'
import { eq } from 'drizzle-orm'
import { users } from '@/database/schema'
import Base from '@/www/layouts/base'

const viewConfess = async ({ env, req }: { env: Env; req: IRequest }) => {
  const getUsers = await env
    .__db_client!.select()
    .from(users)
    .where(eq(users.url, req.params.url))
    .limit(1)

  if (getUsers.length == 0) {
    return Response.json({ error: 'Not found!' }, { status: 404 })
  }

  const jsx = await (
    <Base>
      <div class='mx-auto w-full max-w-md'>
        <div hx-ext='response-targets'>
          <div id='success_message' class='text-sm text-green-600'></div>
          <div id='error_message' class='text-sm text-red-600'></div>
          <form
            hx-post='/api/send-message'
            hx-swap='innerHTML'
            hx-target='#success_message'
            hx-target-4xx='#error_message'
            hx-trigger='submit'
            class='flex flex-col space-y-3 py-4'>
            <label class='font-semibold' for='message'>
              Make Conffession
            </label>
            <p class='text-sm text-gray-600'>
              Send your conffession to:{' '}
              <span class='font-semibold'>{getUsers[0].name}</span>
            </p>
            <textarea
              id='message'
              name='message'
              placeholder='Paijo aku syg kamuuu..'
              class='py-2 px-3 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500 w-full rounded-md '
              required='true'
            />
            <input
              type='text'
              name='user_id'
              value={getUsers[0].id.toString()}
              aria-placeholder='input url'
              aria-label='input user id'
              class='hidden'
            />
            <button
              type='submit'
              class='flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 transition-all focus:outline-none border-black bg-black text-white font-semibold text-sm hover:bg-white hover:text-black'>
              <p>Create a link</p>
              <div id='send' class='i-lucide:send' />
              <div id='loader' class='hidden animate-spin i-lucide:loader-2' />
            </button>
            <p class='text-center text-sm'>
              We will create a link that you can share to people.
            </p>
          </form>
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

export default viewConfess
