import { createFileRoute, Outlet } from '@tanstack/react-router'

import Header from '@/shared/ui/header'

export const Route = createFileRoute('/_authenticated')({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
})
