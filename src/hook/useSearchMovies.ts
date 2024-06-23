import {useDispatch, useSelector} from 'react-redux';
import {searchForMovies} from '../store/api';
import {AppDispatch, RootState} from '../store/store';

export const useSearchMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchResults = useSelector(
    (state: RootState) => state.app.searchResults,
  );

  const handleSearch = (search: string) => {
    dispatch(searchForMovies(search));
  };

  return {handleSearch, searchResults};
};
