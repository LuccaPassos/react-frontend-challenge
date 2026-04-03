import Cookies from 'js-cookie'

const TOKEN_KEY = 'auth_token'

export const saveToken = (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: 1,
        sameSite: 'strict',
    })
}

export const getToken = () => {
    return Cookies.get(TOKEN_KEY)
}

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY)
}