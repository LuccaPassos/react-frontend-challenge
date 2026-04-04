import type { Movie } from '@/entities/movie'
import { DataTable } from '@/shared/ui/data-table'

import { columns } from './columns'

export function WatchlistTable({
  movies,
  genres,
  loading,
}: {
  movies: Movie[]
  genres: Record<number, string>
  loading: boolean
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

  return <DataTable columns={columns} data={dataWithGenres} />
}
