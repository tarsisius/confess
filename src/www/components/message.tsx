import formatTime from '@/lib/utils/time'
import html from '@kitajs/html'

const Message = ({ data }: { data: MessageData }) => (
  <div class='flex flex-col space-y-4 w-full py-2 '>
    <div class='flex justify-between items-center'>
      <p class='flex justify-start text-xs font-italic text-brand-white text-opacity-50'>
        {formatTime(data.createdAt)}
      </p>
      <div class='flex items-center space-x-4'>
        <div class='relative text-left'>
          <button class='flex items-center'>
            <button class='i-lucide:more-horizontal'></button>
          </button>
        </div>
      </div>
    </div>
    <div class='flex flex-col justify-center space-y-2'>
      <p class='text-justify text-brand-white text-opacity-90'>{data.text}</p>
    </div>
  </div>
)

export default Message
