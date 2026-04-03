import { createToken } from './createToken'
import { saveToken } from './tokenStorage'

export const login = async (email: string) => {
    const token = await createToken({
        sub: email,
        role: 'user',
    })

    saveToken(token)
}