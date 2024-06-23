import '@testing-library/jest-native/extend-expect';
import {render} from '@testing-library/react-native';
import React from 'react';
import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import {Detail} from './Detail';
``;
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('../../hook/useGetDetail', () => ({
  useGetDetail: jest.fn(),
}));
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});
const useGetDetailMock = require('../../hook/useGetDetail').useGetDetail;

describe('Detail', () => {
  const route = {
    params: {
      id: 1,
    },
  };

  const detailMock = {
    title: 'Example Movie',
    overview: 'This is an example movie overview.',
    poster_path:
      'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const creditsMock = {
    cast: [
      {
        id: 1,
        name: 'Actor 1',
        profile_path:
          'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Actor 2',
        profile_path:
          'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  };

  const reviewsMock = {
    results: [
      {
        id: 1,
        author: 'Reviewer 1',
        content: 'This is a review content 1.',
        authorDetails: {name: 'Author 1'},
      },
      {
        id: 2,
        author: 'Reviewer 2',
        content: 'This is a review content 2.',
        authorDetails: {name: 'Author 2'},
      },
    ],
  };

  const keywordsMock = {
    keywords: [
      {id: 1, name: 'Keyword 1'},
      {id: 2, name: 'Keyword 2'},
    ],
  };

  beforeEach(() => {
    useGetDetailMock.mockReturnValue({
      detail: detailMock,
      credits: creditsMock,
      reviews: reviewsMock,
      keywords: keywordsMock,
    });
  });

  it('renders detail information correctly', () => {
    const {getByText, getByTestId} = render(<Detail route={route} />);

    // Check detail information rendering
    expect(getByText(detailMock.title)).toBeTruthy();
    expect(getByText(detailMock.overview)).toBeTruthy();
    expect(getByTestId('detail-poster')).toHaveProp('source', {
      uri: detailMock.poster_path,
    });
  });

  it('renders credits correctly', () => {
    const {getByText, getAllByTestId} = render(<Detail route={route} />);

    // Check credits rendering
    creditsMock.cast.forEach((cast, index) => {
      expect(getByText(cast.name)).toBeTruthy();
      expect(getAllByTestId(`detail-actor-images-${index}`)[0]).toHaveProp(
        'source',
        {
          uri: cast.profile_path,
        },
      );
    });
  });

  it('renders reviews correctly', () => {
    const {getByText} = render(<Detail route={route} />);

    // Check reviews rendering
    reviewsMock.results.forEach(review => {
      expect(getByText(review.author)).toBeTruthy();
      expect(getByText(review.content)).toBeTruthy();
      expect(getByText(review.authorDetails.name)).toBeTruthy();
    });
  });

  it('renders keywords correctly', () => {
    const {getByText} = render(<Detail route={route} />);

    // Check keywords rendering
    keywordsMock.keywords.forEach(keyword => {
      expect(getByText(keyword.name)).toBeTruthy();
    });
  });
});
