import html from '@kitajs/html'

const CopyLink = ({ url }: { url: string }) => {
  return (
    <div class='relative flex justify-between items-center -mx-2'>
      <input
        id='url_input'
        class='py-2 px-3 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500 w-full rounded-md '
        type='text'
        value={url}
        readonly='true'
        aria-placeholder='input url'
        aria-label='input url'
      />
      <button
        type='button'
        id='copy_url_button'
        title='copy button'
        class='absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 '>
        <div id='copy_url_icon' class='i-lucide:clipboard-copy' />
        <div id='copied_url_icon' class='i-lucide:copy-check hidden' />
      </button>
    </div>
  )
}

export default CopyLink
