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

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export type Video = {
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export type MovieDetails = Movie & {
  runtime: number;
  backdrop_path: string;
  tagline: string;
  vote_count: number;
  genres: { id: number; name: string }[];
  credits: {
    cast: CastMember[];
    crew: {
      id: number;
      original_name: string;
      job: string;
    }[];
  };
  videos: {
    results: Video[];
  };
}