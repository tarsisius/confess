import { SignJWT, jwtVerify } from 'jose'

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
