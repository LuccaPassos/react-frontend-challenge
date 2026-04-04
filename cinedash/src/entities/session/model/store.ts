import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SessionUser = {
  name: string
  email: string
}

type SessionState = {
  user: SessionUser | null
  guestSessionId: string | null
  expiresAt: string | null
  setUser: (user: SessionUser) => void
  setSession: (id: string, expires: string) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      guestSessionId: null,
      expiresAt: null,
      setUser: (user) => set({ user }),
      setSession: (id, expires) =>
        set({ guestSessionId: id, expiresAt: expires }),
      clearSession: () =>
        set({ user: null, guestSessionId: null, expiresAt: null }),
    }),
    {
      name: 'guest-session-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)