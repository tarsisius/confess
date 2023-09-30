import html from '@kitajs/html'
import Message from './message'

const Messages = ({ data }: { data: MessageData[] }) => {
  return (
    <>
      <div class='flex justify-between'>
        <p class='font-semibold'>Your messages</p>
        <button
          type='button'
          title='refresh button'
          class='i-lucide:refresh-ccw'
        />
      </div>
      <div class='flex flex-col w-full space-y-4'>
        {data.map((message) => (
          <Message data={message} />
        ))}
      </div>
    </>
  )
}

export default Messages
