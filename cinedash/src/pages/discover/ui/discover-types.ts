export type DiscoverFilterForm = {
  with_genres: number[]
  vote_average?: {
    gte?: number
    lte?: number
  }
  primary_release_year?: number
}

export type AppliedDiscoverFilters = {
  with_genres?: number[]
  vote_average_gte?: number
  vote_average_lte?: number
  primary_release_year?: number
}

export const FILTER_DEFAULT_VALUES: DiscoverFilterForm = {
  with_genres: [],
  vote_average: {
    gte: 0,
    lte: 10,
  },
  primary_release_year: undefined,
}

export function buildAppliedFilters(
  data: DiscoverFilterForm,
): AppliedDiscoverFilters | null {
  const nextFilters: AppliedDiscoverFilters = {}
  const hasGenres = data.with_genres.length > 0
  const releaseYear = data.primary_release_year
  const voteAverageGteValue = data.vote_average?.gte
  const voteAverageLteValue = data.vote_average?.lte
  const hasRatingFilter =
    voteAverageGteValue !== undefined &&
    voteAverageLteValue !== undefined &&
    (voteAverageGteValue !== 0 || voteAverageLteValue !== 10)

  if (hasGenres) {
    nextFilters.with_genres = data.with_genres
  }

  if (releaseYear !== undefined) {
    nextFilters.primary_release_year = releaseYear
  }

  if (hasRatingFilter) {
    nextFilters.vote_average_gte = voteAverageGteValue
    nextFilters.vote_average_lte = voteAverageLteValue
  }

  return Object.keys(nextFilters).length === 0 ? null : nextFilters
}
