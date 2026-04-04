import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';

import { movieKeys } from './keys';

interface Genre {
  id: number;
  name: string;
}

export const useGenres = (language = 'pt-BR') => {
  return useQuery({
    queryKey: [...movieKeys.all, 'genres', language],
    queryFn: () => apiFetch<{ genres: Genre[] }>(`/genre/movie/list?language=${language}`),
    select: (data) => {
      return data.genres.reduce<Record<number, string>>((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
};