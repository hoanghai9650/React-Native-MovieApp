export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  production_companies: string[];
  credits?: MovieCredits;
}

export interface MovieSearchResult {
  id: number;
  title: string;
  poster_path: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}
export interface MovieCredits {
  cast: Cast[];
}

export interface Review {
  id: number;
  results: ReviewResult[];
}

export interface ReviewResult {
  author: string;
  authorDetails: AuthorDetails;
  content: string;
  id: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}

export interface Keyword {
  id: number;
  keywords: Keywords[];
}

export interface Keywords {
  id: number;
  name: string;
}

export interface Payload<T> {
  success: boolean;
  data: T;
  error?: string;
}
