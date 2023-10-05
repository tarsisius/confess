import { formatTime, html } from '@/lib/utils'

function message(data: MessageData) {
  return html`
    <div class="flex flex-col space-y-4 w-full py-2 ">
      <div class="flex justify-between items-center">
        <p class="flex justify-start text-xs italic text-opacity-50">
          ${formatTime(data.createdAt)}
        </p>
        <div class="flex items-center space-x-4">
          <div class="relative text-left">
            <button
              type="button"
              title="message_menu"
              class="icon-[lucide--more-horizontal]"></button>
            <div
              class="hidden absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-2 border border-gray-300"
              tab-index="-1">
              <div class="flex flex-col space-y-2 text-sm">
                <button
                  class="px-2 py-1 inset-y-0  rounded border border-gray-200"
                  tab-index="-1">
                  Delete
                </button>
                <button
                  class="px-2 py-1 inset-y-0  rounded border border-gray-200"
                  tab-index="-1">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center space-y-2">
        <p class="text-justify text-opacity-90">${data.text}</p>
      </div>
    </div>
  `
}
export default function messages(data: MessageData[]) {
  return html`
    <p class="font-semibold">Your messages</p>
    <div class="flex flex-col w-full space-y-4">
      ${data.map((m) => message(m)).join('')}
    </div>
  `
}
