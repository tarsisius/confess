import html from '@kitajs/html'
import Message from '@/www/components/message'

const Messages = ({ data }: { data: MessageData[] }) => {
  return (
    <>
      <p class='font-semibold'>Your messages</p>
      <div class='flex flex-col w-full space-y-4'>
        {data.map((message) => (
          <Message data={message} />
        ))}
      </div>
    </>
  )
}

export default Messages
