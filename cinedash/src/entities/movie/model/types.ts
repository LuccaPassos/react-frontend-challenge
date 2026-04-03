export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

export type TrendingResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}