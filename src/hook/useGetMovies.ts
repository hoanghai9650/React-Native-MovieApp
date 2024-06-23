import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRandomMovies} from '../store/api';
import {AppDispatch, RootState} from '../store/store';

export const useGetMovies = () => {
  const movies = useSelector((state: RootState) => state.app.movies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRandomMovies());
  }, [dispatch]);

  return {movies};
};
