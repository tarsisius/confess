import { SignJWT, jwtVerify } from 'jose'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

export function html(strings: TemplateStringsArray, ...values: any[]): string {
  return String.raw({ raw: strings }, ...values)
}

export function formatTime(time: string | Date) {
  dayjs.extend(utc)
  dayjs.extend(relativeTime)
  return dayjs.utc(time).utcOffset(7, true).fromNow()
}

const secret = 'aowkfamwdimf'

export async function verifyJwtToken(token: string | null) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    return payload as {
      name: string
      url: string
    }
  } catch (error) {
    return null
  }
}

export async function getJwtToken({
  name,
  url,
}: {
  name: string
  url: string
}) {
  const token = await new SignJWT({ name, url })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(secret))

  return token
}
