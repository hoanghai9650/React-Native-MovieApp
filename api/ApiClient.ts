// src/apiClient.ts
import axios, {AxiosInstance} from 'axios';
import {
  Keyword,
  Keywords,
  Movie,
  MovieCredits,
  MovieSearchResult,
  Review,
} from './types';

export class MovieApiClient {
  private client: AxiosInstance;
  private imageDomain: string = 'https://image.tmdb.org/t/p/w500';
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: 'API_KEY',
      },
    });
  }

  async fetchRandomMovies(): Promise<{
    success: boolean;
    data?: Movie[];
    error?: string;
  }> {
    try {
      const response = await this.client.get('/movie/popular');
      const movies = response.data.results.map((movie: any) =>
        this.transformMovie(movie),
      );
      return {success: true, data: movies};
    } catch (error) {
      return {success: false, error: this.getErrorMessage(error)};
    }
  }

  async fetchMovieDetails(
    movieId: number,
  ): Promise<{success: boolean; data?: Movie; error?: string}> {
    try {
      const response = await this.client.get(`/movie/${movieId}`);
      const movie = this.transformMovie(response.data);
      return {success: true, data: movie};
    } catch (error) {
      return {success: false, error: this.getErrorMessage(error)};
    }
  }

  async fetchMovieCredits(movieId: number): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      const response = await this.client.get(`/movie/${movieId}/credits`);
      const credits = this.transformMovieCredits(response.data);
      return {success: true, data: credits};
    } catch (error) {
      return {success: false, error: this.getErrorMessage(error)};
    }
  }

  async fetchMovieReviews(
    movieId: number,
  ): Promise<{success: boolean; data?: Review; error?: string}> {
    try {
      const response = await this.client.get(`/movie/${movieId}/reviews`);
      const reviews = this.transformReview(response.data);
      return {success: true, data: reviews};
    } catch (error) {
      return {success: false, error: this.getErrorMessage(error)};
    }
  }

  async fetchMovieKeywords(movieId: number): Promise<{
    success: boolean;
    data?: Keyword;
    error?: string;
  }> {
    try {
      const response = await this.client.get(`/movie/${movieId}/keywords`);
      const keywords = this.transformKeywords(response.data);
      return {success: true, data: keywords};
    } catch (error) {
      return {success: false, error: this.getErrorMessage(error)};
    }
  }

  async searchMovies(
    query: string,
  ): Promise<{success: boolean; data?: MovieSearchResult[]; error?: string}> {
    try {
      const response = await this.client.get('/search/movie', {
        params: {query},
      });
      const searchResults = response.data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
          ? `${this.imageDomain}${movie.poster_path}`
          : '',
      }));
      return {success: true, data: searchResults};
    } catch (error) {
      return {success: false, error: this.getErrorMessage(error)};
    }
  }

  async searchMovieByKeyword(
    keyword: string,
  ): Promise<{success: boolean; data?: MovieSearchResult[]; error?: string}> {
    try {
      const response = await this.client.get('/search/keyword', {
        params: {query: keyword},
      });
      const searchResults = response.data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
          ? `${this.imageDomain}${movie.poster_path}`
          : '',
      }));
      return {success: true, data: searchResults};
    } catch (error) {
      return {success: false, error: this.getErrorMessage(error)};
    }
  }

  private transformMovie(movie: any): Movie {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date || '',
      vote_average: movie.vote_average || 0,
      poster_path: movie.poster_path
        ? `${this.imageDomain}${movie.poster_path}`
        : '',
      production_companies: movie.production_companies || [],
    };
  }

  private transformMovieCredits(credits: any): MovieCredits {
    return {
      cast: credits.cast.map((cast: any) => ({
        id: cast.id,
        name: cast.name,
        character: cast.character,
        profile_path: cast.profile_path
          ? `${this.imageDomain}${cast.profile_path}`
          : '',
      })),
    };
  }

  private transformReview(review: Review): Review {
    return {
      id: review.id,
      results: review.results,
    };
  }

  private transformKeywords(keywords: Keyword): Keyword {
    return {
      id: keywords.id,
      keywords: keywords.keywords.map((keyword: Keywords) => ({
        id: keyword.id,
        name: keyword.name,
      })),
    };
  }
  private getErrorMessage(error: any): string {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return `Request failed with status ${error.response.status}: ${
          error.response.data.message || error.message
        }`;
      } else if (error.request) {
        return 'No response received from the server';
      } else {
        return `Error in request setup: ${error.message}`;
      }
    } else {
      return `Unexpected error: ${error.message}`;
    }
  }
}
