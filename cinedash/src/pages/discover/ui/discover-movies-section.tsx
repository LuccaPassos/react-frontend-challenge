import type { RefObject } from 'react'

import type { Movie } from '@/entities/movie'

import { MovieCard, MovieCardSkeleton } from './movie-card'

type DiscoverMoviesSectionProps = {
  title: string
  movies: Movie[]
  isLoading: boolean
  isFetchingNextPage: boolean
  sentinelRef: RefObject<HTMLDivElement | null>
}

export function DiscoverMoviesSection({
  title,
  movies,
  isLoading,
  isFetchingNextPage,
  sentinelRef,
}: DiscoverMoviesSectionProps) {
  return (
    <main className="flex-1 col-span-4">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance mb-6">
        {title}
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
            .map((_, index) => <MovieCardSkeleton key={`next-${index}`} />)}
      </div>

      <div ref={sentinelRef} />
    </main>
  )
}
