import html from '@kitajs/html'
import { html as render } from 'itty-router/html'
import { parse } from 'cookie'
import { eq } from 'drizzle-orm'
import { users } from '@/database/schema'
import { verifyJwtToken } from '@/lib/utils/jwt'
import Base from '@/www/layouts/base'

const viewHome = async (req: Request, env: Env) => {
  const cookie = parse(req.headers.get('Cookie') || '')

  const token = cookie['__token']
  const data = await verifyJwtToken(token)

  if (data) {
    const user = await env
      .__db_client!.select()
      .from(users)
      .where(eq(users.url, data.url))
      .limit(1)

    if (user.length > 0) {
      return Response.redirect(`${env.HOST}/dash`, 301)
    }
  }

  return render(
    <Base>
      <div class='mx-auto w-full max-w-md'>
        <div hx-ext='response-targets'>
          <form
            _='on htmx:beforeRequest remove .hidden from #loader add .hidden to #send on htmx:beforeOnLoad add .hidden to #loader remove .hidden from #send '
            hx-post='/api/register-user'
            hx-swap='innerHTML'
            hx-target='#errorMessage'
            hx-target-4xx='#errorMessage'
            hx-trigger='submit'
            class='flex flex-col space-y-4 py-3'>
            <label class='text-sm font-semibold' for='name_input'>
              Your Name
            </label>
            <p class='text-sm text-gray-600'>
              This name will showed on your link
            </p>
            <input
              type='text'
              id='name_input'
              name='name'
              placeholder='Paijo'
              autocomplete='off'
              class='py-2 px-3 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500 w-full rounded-md '
              required='true'
            />
            <div id='errorMessage' class='text-sm text-red-600'></div>
            <button
              type='submit'
              title='submit form'
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
}

export default viewHome
