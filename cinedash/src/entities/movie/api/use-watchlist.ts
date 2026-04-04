import { useInfiniteQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';

import type { TrendingResponse } from '../model/types';
import { movieKeys } from './keys';

export const useWatchlist = (accountId: string | null, language = 'pt-BR') => {
  return useInfiniteQuery({
    queryKey: movieKeys.watchlistInfinite(accountId ?? 'guest', language),
    queryFn: ({ pageParam = 1 }) =>
      apiFetch<TrendingResponse>(
        `/account/${accountId}/watchlist/movies?language=${language}&sort_by=created_at.asc&page=${pageParam}`
      ),
    enabled: !!accountId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
};