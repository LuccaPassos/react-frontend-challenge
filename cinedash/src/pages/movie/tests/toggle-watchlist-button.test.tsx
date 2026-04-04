import { fireEvent, render, screen } from '@testing-library/react'
import type { ComponentProps, ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { WatchlistButton } from '../ui/toggle-watchlist-button'

const { mockMutate, mockUseMovieAccountState, mockUseToggleWatchlist } =
  vi.hoisted(() => ({
    mockMutate: vi.fn(),
    mockUseMovieAccountState: vi.fn(),
    mockUseToggleWatchlist: vi.fn(),
  }))

vi.mock('@/entities/session', () => ({
  useSessionStore: (selector: (state: { guestSessionId: string }) => unknown) =>
    selector({ guestSessionId: 'guest-123' }),
}))

vi.mock('@/entities/movie', () => ({
  useMovieAccountState: (...args: [string, string | null]) =>
    mockUseMovieAccountState(...args),
  useToggleWatchlist: (...args: [string | null]) =>
    mockUseToggleWatchlist(...args),
}))

vi.mock('@/shared/ui/button', () => ({
  Button: ({
    children,
    ...props
  }: ComponentProps<'button'> & { children?: ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}))

vi.mock('@/shared/ui/spinner', () => ({
  Spinner: () => <span>Loading</span>,
}))

describe('WatchlistButton', () => {
  it('should add to watchlist when movie is not bookmarked', () => {
    mockUseMovieAccountState.mockReturnValue({
      data: { watchlist: false },
      isLoading: false,
    })
    mockUseToggleWatchlist.mockReturnValue({ mutate: mockMutate })

    render(<WatchlistButton movieId="42" />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Adicionar ou Remover da Watchlist' }),
    )

    expect(mockMutate).toHaveBeenCalledWith({
      movieId: 42,
      isCurrentlyInWatchlist: false,
    })
  })

  it('should remove from watchlist when movie is bookmarked', () => {
    mockUseMovieAccountState.mockReturnValue({
      data: { watchlist: true },
      isLoading: false,
    })
    mockUseToggleWatchlist.mockReturnValue({ mutate: mockMutate })

    render(<WatchlistButton movieId="42" />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Adicionar ou Remover da Watchlist' }),
    )

    expect(mockMutate).toHaveBeenCalledWith({
      movieId: 42,
      isCurrentlyInWatchlist: true,
    })
  })

  it('should render disabled loading button while account state is loading', () => {
    mockUseMovieAccountState.mockReturnValue({
      data: undefined,
      isLoading: true,
    })
    mockUseToggleWatchlist.mockReturnValue({ mutate: mockMutate })

    render(<WatchlistButton movieId="42" />)

    const button = screen.getByRole('button')
    expect(button.getAttribute('disabled')).not.toBeNull()
    expect(screen.getByText('Loading')).toBeTruthy()
  })

  it('should reflect watchlist state visually', () => {
    mockUseMovieAccountState.mockReturnValue({
      data: { watchlist: true },
      isLoading: false,
    })
    mockUseToggleWatchlist.mockReturnValue({ mutate: mockMutate })

    render(<WatchlistButton movieId="42" />)

    expect(screen.getByText('Remover da Watchlist')).toBeTruthy()
    expect(screen.queryByText('Adicionar à Watchlist')).toBeNull()
  })

  it('should reflect non-watchlist state visually', () => {
    mockUseMovieAccountState.mockReturnValue({
      data: { watchlist: false },
      isLoading: false,
    })
    mockUseToggleWatchlist.mockReturnValue({ mutate: mockMutate })

    render(<WatchlistButton movieId="42" />)

    expect(screen.getByText('Adicionar à Watchlist')).toBeTruthy()
    expect(screen.queryByText('Remover da Watchlist')).toBeNull()
  })
})
