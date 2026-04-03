import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/movie/$movieId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Movie Details</div>
}
