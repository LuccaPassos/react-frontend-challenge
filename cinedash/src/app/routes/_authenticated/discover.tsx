import { createFileRoute } from '@tanstack/react-router'

import { Discover } from '@/pages/discover/ui/discover-page'

export const Route = createFileRoute('/_authenticated/discover')({
  component: Discover,
})
