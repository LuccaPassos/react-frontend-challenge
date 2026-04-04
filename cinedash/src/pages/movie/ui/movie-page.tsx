import {
  IconArrowLeft,
  IconBook,
  IconBookmark,
  IconMovie,
  IconPlayerPlay,
  IconStarFilled,
  IconUsers,
} from '@tabler/icons-react'
import { useCanGoBack, useParams, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useMovieDetails } from '@/entities/movie'
import { formatDuration } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Spinner } from '@/shared/ui/spinner'

import { CastCard } from './cast-card'

export function MovieDetails() {
  const { movieId } = useParams({ strict: false })
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useMovieDetails(movieId ?? '')

  useEffect(() => {
    if (isError) {
      console.error('Error fetching movie details:', error)
      toast.error('Falha ao carregar o filme. Por favor, tente novamente.')
    }
  }, [isError])

  const trailer = movie?.videos.results.find(
    (video) =>
      video.official && video.type === 'Trailer' && video.site === 'YouTube',
  )
  const director = movie?.credits.crew.find(
    (member) => member.job === 'Director',
  )

  const formattedRating = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(movie?.vote_average ?? 0)

  return (
    <div className="py-10 px-20 grid grid-cols-1 gap-y-10 gap-x-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
      <div
        className="-my-10 -mx-20 w-full h-[80%] absolute -z-10"
        style={{
          backgroundImage: `
        linear-gradient(
          0deg, var(--background) 5%, color-mix(in srgb, var(--background), transparent 30%) 100%
        ),
        url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <aside className="flex flex-col gap-6">
        {canGoBack ? (
          <Button
            variant="secondary"
            className="w-fit"
            onClick={() => router.history.back()}
          >
            <IconArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        ) : null}

        <Card className="py-0 w-full rounded-lg max-w-75 aspect-2/3 relative">
          {!isLoading && !isError && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt="Poster do filme"
              className="w-full rounded-lg max-w-75 z-1"
            />
          )}
          <IconMovie
            size={48}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground opacity-20"
          />
        </Card>

        <Button variant="secondary" className="w-full max-w-75">
          <IconBookmark />
          Adicionar à Watchlist
        </Button>
      </aside>

      <main className="lg:col-start-2 lg:mt-55 col-span-full flex flex-col gap-10">
        {isLoading ? (
          <p className="italic text-muted-foreground items-center gap-2 h-full flex justify-center">
            <Spinner /> Carregando informações do filme...
          </p>
        ) : isError ? (
          <p className="text-muted-foreground items-center gap-2 h-full flex justify-center">
            Falha ao carregar o filme.
          </p>
        ) : (
          <>
            <div className="flex gap-2">
              {movie?.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
              <Badge variant="outline">
                {movie?.runtime ? formatDuration(movie.runtime) : 'N/A'}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-baseline">
                <h1 className="text-4xl uppercase font-bold inline">
                  {movie?.title}
                </h1>
                <span className="text-2xl text-muted-foreground">
                  {movie?.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : 'N/A'}
                </span>
              </div>
              <p className="text-xl text-muted-foreground">
                {director ? director.original_name : 'N/A'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex gap-1 text-3xl font-bold">
                <IconStarFilled size={32} className="text-amber-500" />
                {formattedRating}
              </span>
              <p className="text-muted-foreground">
                ({movie?.vote_count} votos)
              </p>
            </div>

            <p className="italic text-xl text-muted-foreground">
              {movie?.tagline}
            </p>

            <div>
              <h5 className="my-2 font-bold flex items-center gap-1 text-lg">
                <IconBook className="inline-block" />
                Sinopse
              </h5>
              <p className="leading-snug">{movie?.overview}</p>
            </div>

            <div>
              <h5 className="my-2 font-bold flex items-center gap-1 text-lg">
                <IconUsers className="inline-block" />
                Elenco Principal
              </h5>
              <div className="flex gap-8 overflow-x-auto py-2">
                {movie?.credits.cast.slice(0, 6).map((cast) => (
                  <CastCard
                    key={cast.id}
                    name={cast.name}
                    character={cast.character}
                    imageSrc={cast.profile_path}
                  />
                ))}
              </div>
            </div>

            <div>
              <h5 className="my-2 font-bold flex items-center gap-1 text-lg">
                <IconPlayerPlay className="inline-block" />
                Trailer
              </h5>
              <iframe
                className="rounded-xl aspect-video max-w-200"
                src={`https://www.youtube.com/embed/${trailer?.key}`}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
