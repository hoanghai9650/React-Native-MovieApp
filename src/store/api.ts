import {createAsyncThunk} from '@reduxjs/toolkit';
import {MovieApiClient} from 'api';

const client = new MovieApiClient();

export const getRandomMovies = createAsyncThunk(
  'movie/getRandomMovies',
  async (_, {rejectWithValue}) => {
    try {
      const movies = await client.fetchRandomMovies();
      if (movies.success) {
        return movies.data;
      } else {
        return rejectWithValue(movies.error);
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const searchForMovies = createAsyncThunk(
  'movie/searchForMovies',
  async (query: string, {rejectWithValue}) => {
    try {
      const movies = await client.searchMovies(query);
      if (movies.success) {
        return movies.data;
      } else {
        return rejectWithValue(movies.error);
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const searchMoviesByKeyword = createAsyncThunk(
  'movie/searchForMovies',
  async (query: string, {rejectWithValue}) => {
    try {
      const movies = await client.searchMovieByKeyword(query);
      if (movies.success) {
        return movies.data;
      } else {
        return rejectWithValue(movies.error);
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getMovieDetails = createAsyncThunk(
  'movie/getMovieDetails',
  async (movieId: number, {rejectWithValue}) => {
    try {
      const detail = await client.fetchMovieDetails(movieId);
      if (detail.success) {
        return detail.data;
      } else {
        return rejectWithValue(detail.error);
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getMovieCredits = createAsyncThunk(
  'movie/getMovieCredits',
  async (movieId: number, {rejectWithValue}) => {
    try {
      const credits = await client.fetchMovieCredits(movieId);
      if (credits.success) {
        return credits.data;
      } else {
        return rejectWithValue(credits.error);
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getMovieReviews = createAsyncThunk(
  'movie/getMovieReviews',
  async (movieId: number, {rejectWithValue}) => {
    try {
      const reviews = await client.fetchMovieReviews(movieId);
      if (reviews.success) {
        return reviews.data;
      } else {
        return rejectWithValue(reviews.error);
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getMovieKeywords = createAsyncThunk(
  'movie/getMovieKeywords',
  async (movieId: number, {rejectWithValue}) => {
    try {
      const keywords = await client.fetchMovieKeywords(movieId);
      if (keywords.success) {
        return keywords.data;
      } else {
        return rejectWithValue(keywords.error);
      }
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);
