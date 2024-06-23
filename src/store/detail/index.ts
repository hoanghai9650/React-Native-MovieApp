import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Keyword, Movie, MovieCredits, Review} from 'api/types';
import {
  getMovieCredits,
  getMovieDetails,
  getMovieKeywords,
  getMovieReviews,
} from '../api';

const initialState = {
  movieDetail: null as Movie | null,
  credits: null as MovieCredits | null,
  reviews: null as Review | null,
  keyword: null as Keyword | null,
  loading: false,
  error: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,

  reducers: {
    clearDetail: state => {
      state.movieDetail = null;
      state.credits = null;
      state.reviews = null;
      state.keyword = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMovieDetails.pending, state => {
        state.loading = true;
      })
      .addCase(
        getMovieDetails.fulfilled,
        (state, action: PayloadAction<Movie | undefined>) => {
          state.loading = false;
          state.movieDetail = action.payload as Movie | null;
          state.error = null;
        },
      )
      .addCase(
        getMovieCredits.fulfilled,
        (state, action: PayloadAction<MovieCredits>) => {
          state.credits = action.payload;
        },
      )
      .addCase(
        getMovieReviews.fulfilled,
        (state, action: PayloadAction<Review | undefined>) => {
          state.reviews = action.payload || [];
        },
      )
      .addCase(
        getMovieKeywords.fulfilled,
        (state, action: PayloadAction<Keyword | undefined>) => {
          state.keyword = action.payload || [];
        },
      )
      .addCase(
        getMovieDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.movieDetail = null;
        },
      );
  },
});

export const {clearDetail} = detailSlice.actions;

export default detailSlice.reducer;
