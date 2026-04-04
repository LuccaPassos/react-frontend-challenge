import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';

import { movieKeys } from './keys';

type AccountStateResponse = {
  id: number;
  favorite: boolean;
  rated: boolean | { value: number };
  watchlist: boolean;
}

export const useMovieAccountState = (movieId: string | null, accountId: string | null) => {

  if (!movieId || !accountId) {
    throw new Error("'movieId' and 'accountId' are required to fetch movie account state");
  }

  return useQuery({
    queryKey: [...movieKeys.details(movieId), 'state', accountId],
    queryFn: () =>
      apiFetch<AccountStateResponse>(
        `/movie/${movieId}/account_states?guest_session_id=${accountId}`
      ),
    enabled: !!movieId && !!accountId,
    staleTime: 1000 * 60,
  });
};