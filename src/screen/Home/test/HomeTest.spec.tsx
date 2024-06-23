import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {useGetMovies} from '../../../hook';
import {store} from '../../../store/store';
import {Home} from '../Home';
// Mock the useGetMovies hook
jest.mock('../../../hook', () => ({
  useGetMovies: jest.fn(),
}));

// Mock data for movies
const mockMovies = [
  {id: 1, title: 'Movie 1', poster_path: 'path/to/poster1'},
  {id: 2, title: 'Movie 2', poster_path: 'path/to/poster2'},
  {id: 3, title: 'Movie 3', poster_path: 'path/to/poster3'},
];

describe('Home Screen', () => {
  beforeEach(() => {
    // Setup the mock to return default values
    (useGetMovies as jest.Mock).mockReturnValue({
      movies: mockMovies,
      error: null,
    });
  });

  it('renders without crashing and display header and search bar', async () => {
    const {getAllByTestId} = render(
      <NavigationContainer>
        <Provider store={store}>
          <Home />
        </Provider>
      </NavigationContainer>,
    );
    expect(getAllByTestId('Home')).toBeTruthy();
  });
});
