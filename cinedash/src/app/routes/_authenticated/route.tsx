import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useSessionStore } from '@/entities/session'
import Header from '@/shared/ui/header'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const user = useSessionStore.getState().user

    if (!user) {
      throw redirect({
        to: '/login',
        replace: true,
      })
    }
  },
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
})
