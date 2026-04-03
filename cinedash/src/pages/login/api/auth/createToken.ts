import { SignJWT } from 'jose'

const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET)

export const createToken = async (payload: Record<string, unknown>) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret)
}