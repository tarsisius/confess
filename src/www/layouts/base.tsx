import html, { type PropsWithChildren } from '@kitajs/html'

export const Base = ({ children }: PropsWithChildren) => (
  <>
    {'<!doctype html>'}
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>confess</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='/public/tc.min.css' />
        <link rel='stylesheet' href='/public/hc.css' />
        <link rel='stylesheet' href='/public/generated.min.css' />
        <script src='https://unpkg.com/htmx.org@1.9.6'></script>
        <script src='https://unpkg.com/htmx.org/dist/ext/response-targets.js'></script>
        <script src='https://unpkg.com/hyperscript.org@0.9.11'></script>
        {/* will try alpine js later */}
        {/* <script
          defer
          src='https://cdn.jsdelivr.net/npm/alpinejs@3.13.0/dist/cdn.min.js'></script> */}
      </head>
      <body class='font-sans flex flex-col min-h-screen text-gray-700'>
        <div class='mx-auto flex justify-center my-8'>
          <a href='/' class='flex items-center space-x-1'>
            <img src='/public/icon.png' alt='Image' class='h-6 w-6' />
            <h2 class='text-center text-3xl md:text-2xl font-bold tracking-wide'>
              confess
            </h2>
          </a>
        </div>
        <main class='max-w-screen-lg w-full px-6 md:px-8 mx-auto flex flex-col'>
          {children}
        </main>
        <footer class='text-center mt-auto py-6 text-opacity-40'>
          Project by{' '}
          <a
            class='hover:text-opacity-100'
            target='_blank'
            href='https://github.com/tarsisius'
            rel='noopener noreferrer'>
            @tarsisius
          </a>
        </footer>
      </body>
    </html>
  </>
)

export default Base
