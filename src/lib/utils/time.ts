import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

const formatTime = (time: string | Date) => {
  dayjs.extend(utc)
  dayjs.extend(relativeTime)
  return dayjs.utc(time).utcOffset(7, true).fromNow()
}

export default formatTime
