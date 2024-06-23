import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {SearchBar} from '../SearchBar';

describe('SearchBar Component', () => {
  it('renders the SearchBar component correctly', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <SearchBar testID="search-bar" />,
    );

    const searchBar = getByTestId('search-bar');
    const textInput = getByPlaceholderText('Search');

    expect(searchBar).toBeTruthy();
    expect(textInput).toBeTruthy();
  });

  it('displays the provided text in the TextInput', () => {
    const {getByDisplayValue} = render(<SearchBar text="Initial text" />);

    const textInput = getByDisplayValue('Initial text');
    expect(textInput).toBeTruthy();
  });

  it('calls the onChangeText function when text input changes', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchBar onChangeText={onChangeTextMock} />,
    );

    const textInput = getByPlaceholderText('Search');
    fireEvent.changeText(textInput, 'New text');

    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });

  it('clears the text input when clear button is pressed', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <SearchBar text="Initial text" onChangeText={onChangeTextMock} />,
    );

    const textInput = getByPlaceholderText('Search');
    const clearButton = getByTestId('searchBar-button-clear');

    fireEvent.press(clearButton);

    expect(onChangeTextMock).toHaveBeenCalledWith('');
    expect(textInput.props.value).toBe('Initial text');
  });
});
