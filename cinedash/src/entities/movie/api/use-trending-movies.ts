import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api/base';

import type { TrendingResponse } from '../model/types';

export const movieKeys = {
  all: ['movies'] as const,
  trending: (lang: string, page: number) => [...movieKeys.all, 'trending', lang, page] as const,
};

export const useTrendingMovies = (page = 1, language = 'pt-BR') => {
  return useQuery({
    queryKey: movieKeys.trending(language, page),
    queryFn: () =>
      apiFetch<TrendingResponse>(`/trending/movie/day?page=${page}&language=${language}`),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};