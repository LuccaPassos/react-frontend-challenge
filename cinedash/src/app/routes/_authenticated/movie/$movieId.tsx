import { createFileRoute } from '@tanstack/react-router'

import { MovieDetails } from '@/pages/movie'

export const Route = createFileRoute('/_authenticated/movie/$movieId')({
  component: MovieDetails,
})
