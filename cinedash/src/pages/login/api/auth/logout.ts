import Cookies from 'js-cookie'

import { useSessionStore } from '@/entities/session'
import { queryClient } from '@/shared/api'

import { removeToken } from './tokenStorage'

const GUEST_SESSION_COOKIE_KEY = 'guest_session_id'

export const logout = async () => {
    removeToken()
    Cookies.remove(GUEST_SESSION_COOKIE_KEY)
    useSessionStore.getState().clearSession()
    queryClient.clear()
}