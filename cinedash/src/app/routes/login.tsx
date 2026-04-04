import { createFileRoute, redirect } from '@tanstack/react-router'

import { useSessionStore } from '@/entities/session'
import { LoginPage } from '@/pages/login'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const user = useSessionStore.getState().user

    if (user) {
      throw redirect({
        to: '/discover',
        replace: true,
      })
    }
  },
  component: LoginPage,
})
