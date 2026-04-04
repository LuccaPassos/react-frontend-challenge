import { IconSearch } from '@tabler/icons-react'
import debounce from 'lodash.debounce'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  useInfiniteDiscoverMovies,
  useInfiniteSearchMovies,
  useInfiniteTrendingMovies,
} from '@/entities/movie'
import { useIntersection } from '@/shared/lib/use-intersection'
import { Button } from '@/shared/ui/button'
import { ButtonGroup } from '@/shared/ui/button-group'
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

import { DiscoverEmptyState } from './discover-empty-state'
import { DiscoverFiltersCard } from './discover-filters-card'
import { DiscoverMoviesSection } from './discover-movies-section'
import type {
  AppliedDiscoverFilters,
  DiscoverFilterForm,
} from './discover-types'
import { buildAppliedFilters, FILTER_DEFAULT_VALUES } from './discover-types'

export function Discover() {
  const [appliedFilters, setAppliedFilters] =
    useState<AppliedDiscoverFilters | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  const debouncedSetQuery = useMemo(
    () => debounce((query: string) => setDebouncedSearchQuery(query), 400),
    [],
  )

  useEffect(() => {
    debouncedSetQuery(searchQuery)
  }, [searchQuery, debouncedSetQuery])

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [debouncedSetQuery])

  const {
    data: trendingData,
    fetchNextPage: fetchNextTrendingPage,
    hasNextPage: hasNextTrendingPage,
    isFetchingNextPage: isFetchingNextTrendingPage,
    error: trendingError,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
  } = useInfiniteTrendingMovies()

  const hasAppliedFilters = appliedFilters !== null
  const hasSearchQuery = debouncedSearchQuery.trim().length > 0

  const {
    data: searchData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
    error: searchError,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useInfiniteSearchMovies(debouncedSearchQuery, 'pt-BR', {
    enabled: hasSearchQuery,
  })

  const {
    data: discoverData,
    fetchNextPage: fetchNextDiscoverPage,
    hasNextPage: hasNextDiscoverPage,
    isFetchingNextPage: isFetchingNextDiscoverPage,
    error: discoverError,
    isError: isDiscoverError,
    isLoading: isDiscoverLoading,
  } = useInfiniteDiscoverMovies(appliedFilters, 'pt-BR', {
    enabled: hasAppliedFilters,
  })

  const trendingMovies =
    trendingData?.pages.flatMap((page) => page.results) ?? []
  const discoverMovies =
    discoverData?.pages.flatMap((page) => page.results) ?? []
  const searchMovies = searchData?.pages.flatMap((page) => page.results) ?? []

  const movies = hasSearchQuery
    ? searchMovies
    : hasAppliedFilters
      ? discoverMovies
      : trendingMovies
  const isLoading = hasSearchQuery
    ? isSearchLoading
    : hasAppliedFilters
      ? isDiscoverLoading
      : isTrendingLoading
  const isFetchingNextPage = hasSearchQuery
    ? isFetchingNextSearchPage
    : hasAppliedFilters
      ? isFetchingNextDiscoverPage
      : isFetchingNextTrendingPage
  const isError = hasSearchQuery
    ? isSearchError
    : hasAppliedFilters
      ? isDiscoverError
      : isTrendingError
  const activeError = hasSearchQuery
    ? searchError
    : hasAppliedFilters
      ? discoverError
      : trendingError

  const form = useForm<DiscoverFilterForm>({
    defaultValues: FILTER_DEFAULT_VALUES,
  })

  useEffect(() => {
    if (isError) {
      console.error('Error fetching movies:', activeError)
      toast.error('Falha ao carregar os filmes. Por favor, tente novamente.')
    }
  }, [isError, activeError])

  const sentinelRef = useIntersection(
    () => {
      if (hasSearchQuery) {
        fetchNextSearchPage()
        return
      }

      if (hasAppliedFilters) {
        fetchNextDiscoverPage()
        return
      }

      fetchNextTrendingPage()
    },
    hasSearchQuery
      ? !!hasNextSearchPage && !isFetchingNextSearchPage
      : hasAppliedFilters
        ? !!hasNextDiscoverPage && !isFetchingNextDiscoverPage
        : !!hasNextTrendingPage && !isFetchingNextTrendingPage,
  )

  const onSubmit = (data: DiscoverFilterForm) => {
    const nextFilters = buildAppliedFilters(data)
    setAppliedFilters(nextFilters)
  }

  const handleResetFilters = () => {
    form.reset(FILTER_DEFAULT_VALUES)
    setAppliedFilters(null)
  }

  const hasNoResults = !isLoading && movies.length === 0

  return (
    <div className="py-10 px-20 grid grid-cols-5 gap-x-12">
      <aside className="flex flex-col gap-6 col-start-1">
        <Field>
          <ButtonGroup>
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Procure um filme..."
            />
            <Button
              type="button"
              variant="outline"
              aria-label="Pesquisar filme"
              onClick={() => debouncedSetQuery.flush()}
            >
              <IconSearch />
            </Button>
          </ButtonGroup>
        </Field>

        <div className="text-center text-sm  text-muted-foreground">OU</div>

        <DiscoverFiltersCard
          form={form}
          onSubmit={onSubmit}
          onReset={handleResetFilters}
        />
      </aside>

      {hasNoResults || isError ? (
        <DiscoverEmptyState />
      ) : (
        <DiscoverMoviesSection
          title={
            hasSearchQuery
              ? `Resultados para "${debouncedSearchQuery}"`
              : hasAppliedFilters
                ? 'Resultados do filtro'
                : 'Populares'
          }
          movies={movies}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          sentinelRef={sentinelRef}
        />
      )}
    </div>
  )
}
