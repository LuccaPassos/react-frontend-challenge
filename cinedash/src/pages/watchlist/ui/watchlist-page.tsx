import { useGenres, useWatchlist } from '@/entities/movie'
import { useSessionStore } from '@/entities/session'
import { useIntersection } from '@/shared/lib/use-intersection'

import { WatchlistTable } from './watchlist-table'

export function Watchlist() {
  const accountId = useSessionStore((s) => s.guestSessionId)

  const {
    data,
    isLoading: isMoviesLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useWatchlist(accountId)
  const { data: genreLookup, isLoading: isGenresLoading } = useGenres()

  const movies = data?.pages.flatMap((page) => page.results) ?? []

  const sentinelRef = useIntersection(
    () => fetchNextPage(),
    !!hasNextPage && !isFetchingNextPage,
  )

  return (
    <div className="py-10 px-20 flex flex-col h-[calc(100vh-80px)]">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance mb-6">
        Minha Watchlist
      </h1>
      <div className="pb-10">
        <WatchlistTable
          movies={movies}
          genres={genreLookup || {}}
          loading={isMoviesLoading || isGenresLoading}
          loadingMore={isFetchingNextPage}
        />
        <div ref={sentinelRef} />
      </div>
    </div>
  )
}
