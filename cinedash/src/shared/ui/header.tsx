import { IconBookmark, IconNorthStar } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

import CineDashLogo from '@/shared/assets/cinedash-logo.svg?react'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button'

export default function Header() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-border bg-background px-8 text-foreground sticky">
      <div className="flex items-center gap-12">
        <div className="flex items-center px-10">
          <Link to="/discover">
            <CineDashLogo className="w-35" />
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/discover">
            {({ isActive }) => (
              <Button variant={isActive ? 'secondary' : 'ghost'}>
                <IconNorthStar className="h-4 w-4" />
                Descoberta
              </Button>
            )}
          </Link>

          <Link to="/watchlist">
            {({ isActive }) => (
              <Button variant={isActive ? 'secondary' : 'ghost'}>
                <IconBookmark className="h-4 w-4" />
                Watchlist
              </Button>
            )}
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end leading-none">
          <span className="text-sm font-bold ">Lucca Covre</span>
          <span className="text-xs text-muted-foreground">
            lucca.covre@exemplo.com
          </span>
        </div>
        <Avatar className="h-10 w-10 ring-2 ring-border ring-offset-2 ring-offset-background">
          <AvatarImage src="https://github.com/shadcn.png" alt="User Profile" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            LC
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
