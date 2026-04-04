import { IconDots, IconStarFilled } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

import type { Movie } from '@/entities/movie'
import { useToggleWatchlist } from '@/entities/movie'
import { useSessionStore } from '@/entities/session'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { DataTableColumnHeader } from '../../../shared/ui/data-table-column-header'

export type TableMeta = {
  genreLookup?: Record<number, string>
}

type WatchListMovie = Movie & {
  genres: string[]
}

export const columns: ColumnDef<WatchListMovie>[] = [
  {
    accessorKey: 'title',
    size: 500,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filme" className="ml-3" />
    ),
    cell: ({ row }) => {
      const movie = row.original
      return (
        <div className="flex items-center gap-5 ml-3">
          <img
            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            className="h-18 rounded-sm object-cover"
          />
          {movie.title}
        </div>
      )
    },
  },
  {
    accessorKey: 'genres',
    size: 400,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gêneros" />
    ),
    sortingFn: (rowA: any, rowB: any, columnId: string) => {
      const genreA = rowA.getValue(columnId)[0]
      const genreB = rowB.getValue(columnId)[0]

      return genreA.localeCompare(genreB, 'pt-BR')
    },
    cell: ({ row }) => {
      const { genres } = row.original

      return (
        <div className="flex flex-wrap gap-1">
          {genres.map((title, index) => (
            <Badge variant="outline" key={`${title}-${index}`}>
              {title}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'releaseDate',
    size: 300,
    header: 'Data de Lançamento',
    cell: ({ row }) => {
      const movie = row.original

      return (
        <span>
          {new Date(movie.release_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>
      )
    },
  },
  {
    accessorKey: 'vote_average',
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pontuação" />
    ),
    cell: ({ row }) => {
      const rating = row.original.vote_average
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        maximumFractionDigits: 1,
      }).format(rating)

      return (
        <div className="flex items-start gap-2 font-bold">
          <IconStarFilled size={16} className="fill-amber-500" />
          <span>{formatted}</span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const movie = row.original

      const accountId = useSessionStore((s) => s.guestSessionId)
      const { mutate } = useToggleWatchlist(accountId)

      const handleRemoveBookmark = () => {
        mutate({
          movieId: movie.id,
          isCurrentlyInWatchlist: true,
        })
      }

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <IconDots className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <Link
                  to="/movie/$movieId"
                  params={{
                    movieId: `${movie.id}`,
                  }}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    Ver detalhes
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleRemoveBookmark}
                >
                  Remover
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
