import { IconBookmark, IconNorthStar, IconSunMoon } from '@tabler/icons-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useSessionStore } from '@/entities/session'
import { logout } from '@/pages/login/api/auth/logout'
import { CineDashLogo, UserAvatar } from '@/shared/assets'
import { useThemeStore } from '@/shared/model/theme-store'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'

export default function Header() {
  const navigate = useNavigate()
  const user = useSessionStore((state) => state.user)
  const hydrateTheme = useThemeStore((state) => state.hydrate)
  const toggleTheme = useThemeStore((state) => state.toggleMode)

  useEffect(() => {
    hydrateTheme()
  }, [hydrateTheme])

  const handleLogout = async () => {
    await logout()
    navigate({ to: '/login' })
  }

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-border bg-[rgb(var(--background)/0.5)]  px-8 text-foreground sticky top-0 z-10 backdrop-blur-sm">
      <div className="flex items-center gap-12">
        <div className="flex items-center">
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
          <span className="text-sm font-bold ">{user?.name}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label="Abrir menu do perfil"
                className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Avatar className="h-10 w-10 ring-2 ring-border ring-offset-2 ring-offset-background">
                  <AvatarImage src={UserAvatar} alt="User Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    LC
                  </AvatarFallback>
                </Avatar>
              </button>
            }
          />
          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onClick={toggleTheme}
            >
              <span className="flex items-center gap-1.5">
                <IconSunMoon className="h-4 w-4" />
              </span>
              Alternar tema
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer gap-2"
              onClick={handleLogout}
            >
              Sair da conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
