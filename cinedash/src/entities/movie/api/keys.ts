export const movieKeys = {
    all: ['movies'] as const,
    details: (id: string) => [...movieKeys.all, 'detail', id] as const,
    trending: (lang: string) => [...movieKeys.all, 'trending', lang] as const,
    infinite: (lang: string) => [...movieKeys.trending(lang), 'infinite'] as const,
    discover: (lang: string, filters: Record<string, unknown>) =>
        [...movieKeys.all, 'discover', lang, filters] as const,
    discoverInfinite: (lang: string, filters: Record<string, unknown>) =>
        [...movieKeys.discover(lang, filters), 'infinite'] as const,
    watchlist: (accountId: string) => [...movieKeys.all, 'watchlist', accountId] as const,
    watchlistInfinite: (accountId: string, lang: string) =>
        [...movieKeys.watchlist(accountId), lang, 'infinite'] as const,
};
