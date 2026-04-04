import { useInfiniteQuery } from '@tanstack/react-query'

import { apiFetch } from '@/shared/api'

import type { TrendingResponse } from '../model/types'
import { movieKeys } from './keys'

export type DiscoverMoviesFilters = {
    with_genres?: number[]
    primary_release_year?: number
    vote_average_gte?: number
    vote_average_lte?: number
}

type UseDiscoverMoviesOptions = {
    enabled?: boolean
}

export const useInfiniteDiscoverMovies = (
    filters: DiscoverMoviesFilters | null,
    language = 'pt-BR',
    options?: UseDiscoverMoviesOptions,
) => {
    const queryFilters = filters ?? {}

    return useInfiniteQuery({
        queryKey: movieKeys.discoverInfinite(language, queryFilters),
        queryFn: ({ pageParam = 1 }) => {
            const params = new URLSearchParams({ language })
            params.set('page', String(pageParam))

            if (queryFilters.with_genres?.length) {
                params.set('with_genres', queryFilters.with_genres.join(','))
            }

            if (queryFilters.vote_average_gte !== undefined) {
                params.set('vote_average.gte', String(queryFilters.vote_average_gte))
            }

            if (queryFilters.vote_average_lte !== undefined) {
                params.set('vote_average.lte', String(queryFilters.vote_average_lte))
            }

            if (queryFilters.primary_release_year !== undefined) {
                params.set(
                    'primary_release_year',
                    String(queryFilters.primary_release_year),
                )
            }

            return apiFetch<TrendingResponse>(`/discover/movie?${params.toString()}`)
        },
        enabled: (options?.enabled ?? true) && !!filters,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1
            return nextPage <= lastPage.total_pages ? nextPage : undefined
        },
        staleTime: 1000 * 60 * 5,
    })
}

export const useDiscoverMovies = useInfiniteDiscoverMovies