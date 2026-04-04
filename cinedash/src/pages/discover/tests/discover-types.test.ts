import { describe, expect, it } from 'vitest'

import { buildAppliedFilters, FILTER_DEFAULT_VALUES } from '../ui/discover-types'

describe('buildAppliedFilters', () => {
    it('should return null when filters are at default values', () => {
        const result = buildAppliedFilters(FILTER_DEFAULT_VALUES)

        expect(result).toBeNull()
    })

    it('should include selected genres', () => {
        const result = buildAppliedFilters({
            ...FILTER_DEFAULT_VALUES,
            with_genres: [28, 12],
        })

        expect(result).toEqual({ with_genres: [28, 12] })
    })

    it('should include release year when provided', () => {
        const result = buildAppliedFilters({
            ...FILTER_DEFAULT_VALUES,
            primary_release_year: 2024,
        })

        expect(result).toEqual({ primary_release_year: 2024 })
    })

    it('should include rating filter only when range differs from default', () => {
        const result = buildAppliedFilters({
            ...FILTER_DEFAULT_VALUES,
            vote_average: { gte: 7, lte: 9 },
        })

        expect(result).toEqual({
            vote_average_gte: 7,
            vote_average_lte: 9,
        })
    })

    it('should combine all active filters in one payload', () => {
        const result = buildAppliedFilters({
            with_genres: [16],
            vote_average: { gte: 8, lte: 10 },
            primary_release_year: 2023,
        })

        expect(result).toEqual({
            with_genres: [16],
            vote_average_gte: 8,
            vote_average_lte: 10,
            primary_release_year: 2023,
        })
    })
})
