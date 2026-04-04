import { useGenres, useWatchlist } from '@/entities/movie'
import { useSessionStore } from '@/entities/session'

import { WatchlistTable } from './watchlist-table'

export function Watchlist() {
  const accountId = useSessionStore((s) => s.guestSessionId)

  const { data: movies, isLoading: isMoviesLoading } = useWatchlist(accountId)
  const { data: genreLookup, isLoading: isGenresLoading } = useGenres()

  return (
    <div className="py-10 px-20 flex flex-col h-[calc(100vh-80px)]">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance mb-6">
        Minha Watchlist
      </h1>
      <div className="pb-10">
        <WatchlistTable
          movies={movies?.results || []}
          genres={genreLookup || {}}
          loading={isMoviesLoading || isGenresLoading}
        />
      </div>
    </div>
  )
}
