export const movieKeys = {
    all: ['movies'] as const,
    details: (id: string) => [...movieKeys.all, 'detail', id] as const,
    trending: (lang: string) => [...movieKeys.all, 'trending', lang] as const,
    infinite: (lang: string) => [...movieKeys.trending(lang), 'infinite'] as const,
};
