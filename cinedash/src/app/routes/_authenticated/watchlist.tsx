import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/watchlist')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Watchlist</div>
}
