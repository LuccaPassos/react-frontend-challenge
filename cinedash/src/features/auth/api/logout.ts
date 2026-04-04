import { useSessionStore } from '@/entities/session'
import { queryClient } from '@/shared/api'

export const logout = async () => {
    useSessionStore.getState().clearSession()
    queryClient.clear()
}