import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';

import { useSessionStore } from '../model/store';

interface GuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export const useCreateGuestSession = () => {
  const setSession = useSessionStore((state) => state.setSession);
  const existingId = useSessionStore((state) => state.guestSessionId);
  const existingExpiresAt = useSessionStore((state) => state.expiresAt);

  return useQuery({
    queryKey: ['session', 'guest'],
    queryFn: async () => {
      if (existingId && existingExpiresAt) {
        return {
          success: true,
          guest_session_id: existingId,
          expires_at: existingExpiresAt,
        };
      }

      const data = await apiFetch<GuestSessionResponse>('/authentication/guest_session/new');

      setSession(data.guest_session_id, data.expires_at);

      return data;
    },
    enabled: false,
    staleTime: Infinity,
  });
};