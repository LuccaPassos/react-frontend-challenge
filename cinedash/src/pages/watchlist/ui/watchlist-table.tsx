import type { Movie } from '@/entities/movie'
import { DataTable } from '@/shared/ui/data-table'
import { Spinner } from '@/shared/ui/spinner'

import { columns } from './columns'

export function WatchlistTable({
  movies,
  genres,
  loading,
  loadingMore,
}: {
  movies: Movie[]
  genres: Record<number, string>
  loading?: boolean
  loadingMore?: boolean
}) {
  if (loading) {
    return <DataTable columns={columns} data={[]} loading={loading} />
  }

  const dataWithGenres = movies.map((movie) => ({
    ...movie,
    genres:
      movie.genre_ids
        ?.filter((id) => !!genres[id])
        .map((id) => genres[id])
        .sort((a, b) => a.localeCompare(b, 'pt-BR')) ?? [],
  }))

  return (
    <div className="space-y-3">
      <DataTable columns={columns} data={dataWithGenres} />
      {loadingMore ? (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Spinner className="size-4" />
          Carregando mais filmes...
        </div>
      ) : null}
    </div>
  )
}
