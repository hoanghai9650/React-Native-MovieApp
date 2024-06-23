import {NavigationContainer} from '@react-navigation/native';
import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {VerticalItems} from '..';

describe('VerticalItems', () => {
  it('renders a list of items vertically', () => {
    const items = [
      {
        id: 1,
        poster_path:
          'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Example Movie 1',
      },
      {
        id: 2,
        poster_path:
          'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Example Movie 2',
      },
      {
        id: 3,
        poster_path:
          'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Example Movie 3',
      },
    ];
    render(
      <NavigationContainer>
        {items.map((item, index) => (
          <View key={index}>
            <VerticalItems
              title={item.title}
              id={item.id}
              poster_path={item.poster_path}
            />
          </View>
        ))}
      </NavigationContainer>,
    );

    // render titles
    items.forEach(item => {
      expect(screen.getByText(item.title)).toBeTruthy();
    });
    // render images
    const images = screen.getAllByTestId('vertical-list-item');
    expect(images.length).toBe(items.length);
  });

  // Add more tests here as needed
});
