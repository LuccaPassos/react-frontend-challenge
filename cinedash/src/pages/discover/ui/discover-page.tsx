import { IconMovie, IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  useInfiniteDiscoverMovies,
  useInfiniteTrendingMovies,
} from '@/entities/movie'
import { useIntersection } from '@/shared/lib/use-intersection'
import { Button } from '@/shared/ui/button'
import { ButtonGroup } from '@/shared/ui/button-group'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

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
  const movies = hasAppliedFilters ? discoverMovies : trendingMovies
  const isLoading = hasAppliedFilters ? isDiscoverLoading : isTrendingLoading
  const isFetchingNextPage = hasAppliedFilters
    ? isFetchingNextDiscoverPage
    : isFetchingNextTrendingPage
  const isError = hasAppliedFilters ? isDiscoverError : isTrendingError
  const activeError = hasAppliedFilters ? discoverError : trendingError

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
      if (hasAppliedFilters) {
        fetchNextDiscoverPage()
        return
      }

      fetchNextTrendingPage()
    },
    hasAppliedFilters
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

  if ((!isLoading && movies.length === 0) || isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconMovie />
          </EmptyMedia>
          <EmptyTitle>Nenhum filme por aqui</EmptyTitle>
          <EmptyDescription>
            Experimente ajustar os filtros ou procure por outro título para
            encontrar o que deseja.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="py-10 px-20 grid grid-cols-5 gap-x-12">
      <aside className="flex flex-col gap-6 col-start-1">
        <Field>
          <ButtonGroup>
            <Input placeholder="Procure um filme..." />
            <Button variant="outline" aria-label="Pesquisar filme">
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

      <DiscoverMoviesSection
        title={hasAppliedFilters ? 'Resultados do filtro' : 'Populares'}
        movies={movies}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        sentinelRef={sentinelRef}
      />
    </div>
  )
}
