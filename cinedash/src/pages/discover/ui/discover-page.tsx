import { IconFilter2, IconMovie, IconSearch } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useInfiniteTrendingMovies } from '@/entities/movie'
import { useIntersection } from '@/shared/lib/use-intersection'
import { Button } from '@/shared/ui/button'
import { ButtonGroup } from '@/shared/ui/button-group'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { TextField } from '@/shared/ui/text-field'

import { GenreSelector } from './genre-selector'
import { MovieCard, MovieCardSkeleton } from './movie-card'
import { SliderControlled } from './rating-slider'

export function Discover() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    isError,
  } = useInfiniteTrendingMovies()

  const movies = data?.pages.flatMap((page) => page.results) ?? []

  const form = useForm()

  useEffect(() => {
    if (isError) {
      console.error('Error fetching trending movies:', error)
      toast.error('Falha ao carregar os filmes. Por favor, tente novamente.')
    }
  }, [isError])

  const sentinelRef = useIntersection(
    () => fetchNextPage(),
    !!hasNextPage && !isFetchingNextPage,
  )

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

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconFilter2 size={24} />
              Filtros
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={() => {}} id="filter-form">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="genre">Gêneros</FieldLabel>
                  <GenreSelector />
                </Field>

                <SliderControlled />

                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name="releaseYear"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        id="release-year"
                        label="Ano de Lançamento"
                        type="number"
                        placeholder="Ex: 2005"
                        min={0}
                        error={fieldState.error}
                      />
                    )}
                  />
                </div>
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button variant="ghost">Limpar Filtro</Button>
            <Button type="submit" variant="default">
              Buscar
            </Button>
          </CardFooter>
        </Card>
      </aside>

      <main className="flex-1 col-span-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance mb-6">
          Populares
        </h1>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-10">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <MovieCardSkeleton key={index} />)
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  imageSrc={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  title={movie.title}
                  releaseYear={new Date(movie.release_date).getFullYear()}
                  rating={movie.vote_average}
                />
              ))}
          {isFetchingNextPage &&
            Array(3)
              .fill(0)
              .map((_, index) => <MovieCardSkeleton key={index} />)}
        </div>

        <div ref={sentinelRef} />
      </main>
    </div>
  )
}
