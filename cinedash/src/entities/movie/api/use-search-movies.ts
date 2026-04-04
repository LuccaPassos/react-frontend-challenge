import { useInfiniteQuery } from '@tanstack/react-query'

import { apiFetch } from '@/shared/api'

import type { TrendingResponse } from '../model/types'
import { movieKeys } from './keys'

type UseSearchMoviesOptions = {
  enabled?: boolean
}

export const useInfiniteSearchMovies = (
  query: string,
  language = 'pt-BR',
  options?: UseSearchMoviesOptions,
) => {
  const normalizedQuery = query.trim()

  return useInfiniteQuery({
    queryKey: movieKeys.searchInfinite(language, normalizedQuery),
    queryFn: ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        query: normalizedQuery,
        language,
        page: String(pageParam),
      })

      return apiFetch<TrendingResponse>(`/search/movie?${params.toString()}`)
    },
    enabled: (options?.enabled ?? true) && normalizedQuery.length > 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1
      return nextPage <= lastPage.total_pages ? nextPage : undefined
    },
    staleTime: 1000 * 60 * 5,
  })
}