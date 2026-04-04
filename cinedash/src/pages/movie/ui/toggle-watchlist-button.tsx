import { IconBookmark, IconBookmarkOff } from '@tabler/icons-react'

import { useMovieAccountState, useToggleWatchlist } from '@/entities/movie'
import { useSessionStore } from '@/entities/session'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'

type WatchlistButtonProps = {
  movieId: string
}

export function WatchlistButton({ movieId }: WatchlistButtonProps) {
  const accountId = useSessionStore((s) => s.guestSessionId)

  const { data: state, isLoading } = useMovieAccountState(movieId, accountId)
  const { mutate } = useToggleWatchlist(accountId)

  const isInWatchlist = !!state?.watchlist

  const handleToggle = () => {
    mutate({
      movieId: Number(movieId),
      isCurrentlyInWatchlist: isInWatchlist,
    })
  }

  if (isLoading) {
    return (
      <Button variant="secondary" className="w-full max-w-75" disabled>
        <Spinner />
      </Button>
    )
  }

  return (
    <Button
      variant="secondary"
      className="w-full max-w-75"
      aria-label="Adicionar à watchlist"
      onClick={handleToggle}
      disabled={isLoading}
    >
      {isInWatchlist ? <IconBookmarkOff /> : <IconBookmark />}
      {isInWatchlist ? 'Remover da Watchlist' : 'Adicionar à Watchlist'}
    </Button>
  )
}
