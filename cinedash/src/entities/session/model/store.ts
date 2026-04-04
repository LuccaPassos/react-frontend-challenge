import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SessionState = {
  guestSessionId: string | null;
  expiresAt: string | null;
  setSession: (id: string, expires: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      guestSessionId: null,
      expiresAt: null,
      setSession: (id, expires) => set({ guestSessionId: id, expiresAt: expires }),
      clearSession: () => set({ guestSessionId: null, expiresAt: null }),
    }),
    {
      name: 'guest-session-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);