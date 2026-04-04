import { useInfiniteQuery } from '@tanstack/react-query'

import { apiFetch } from '@/shared/api/base';

import type { TrendingResponse } from '../model/types';

export const movieKeys = {
  all: ['movies'] as const,
  trending: (lang: string) => [...movieKeys.all, 'trending', lang] as const,
  infinite: (lang: string) => [...movieKeys.trending(lang), 'infinite'] as const,
};

export const useInfiniteTrendingMovies = (language = 'pt-BR') => {
  return useInfiniteQuery({
    queryKey: movieKeys.infinite(language),

    queryFn: ({ pageParam = 1 }) =>
      apiFetch<TrendingResponse>(`/trending/movie/day?page=${pageParam}&language=${language}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {

      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 60
  });
};