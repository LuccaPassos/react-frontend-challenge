import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';

import type { MovieDetails } from '../model/types';
import { movieKeys } from './keys';

export const useMovieDetails = (id: string, language = 'pt-BR') => {
  return useQuery({
    queryKey: movieKeys.details(id),
    queryFn: () =>
      apiFetch<MovieDetails>(
        `/movie/${id}?append_to_response=videos,credits&language=${language}`
      ),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};