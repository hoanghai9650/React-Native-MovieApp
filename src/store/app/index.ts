import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie} from 'api/types';
import {getRandomMovies, searchForMovies, searchMoviesByKeyword} from '../api';

const initialState = {
  movies: [] as Movie[],
  searchResults: [] as Movie[],
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    updateSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRandomMovies.pending, state => {
        state.loading = true;
      })
      .addCase(
        getRandomMovies.fulfilled,
        (state, action: PayloadAction<Movie[] | undefined>) => {
          state.loading = false;
          state.movies = action.payload || [];
        },
      )
      .addCase(searchForMovies.pending, state => {
        state.loading = true;
      })
      .addCase(
        searchForMovies.fulfilled,
        (state, action: PayloadAction<Movie[] | undefined>) => {
          state.loading = false;
          state.searchResults = action.payload || [];
        },
      )
      .addCase(
        getRandomMovies.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(
        searchMoviesByKeyword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {updateSearchResults} = appSlice.actions;
export default appSlice.reducer;
