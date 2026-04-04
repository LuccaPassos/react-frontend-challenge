import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';

import type { TrendingResponse } from '../model/types';
import { movieKeys } from './keys';

export const useWatchlist = (accountId: string | null, language = 'pt-BR') => {

  if (!accountId) {
    throw new Error("'accountId' is required to fetch watchlist");
  }

  return useQuery({
    queryKey: movieKeys.watchlist(accountId),
    queryFn: () =>
      apiFetch<TrendingResponse>(
        `/account/${accountId}/watchlist/movies?language=${language}&sort_by=created_at.asc`
      ),
    enabled: !!accountId,
  });
};