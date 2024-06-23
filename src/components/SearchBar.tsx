import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface SearchBarProps {
  text?: string;
  onChangeText?: (text: string) => void;
  testID?: string;
}

export enum SearchType {
  KEYWORD = 'movie',
  TITLE = 'person',
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const ref = React.useRef<TextInput>(null);

  const handleClear = () => {
    ref.current?.clear();
    props?.onChangeText ? props.onChangeText('') : null;
  };

  return (
    <View style={styles.container} testID={props?.testID}>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/search.png')} style={styles.img} />
        <TextInput
          ref={ref}
          placeholder="Search"
          value={props?.text}
          onChangeText={props?.onChangeText}
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity
        style={styles.clear}
        onPress={handleClear}
        testID="searchBar-button-clear">
        <Image
          source={require('../assets/clear.png')}
          style={styles.clearImg}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {width: 16, height: 16, tintColor: 'black'},
  clearImg: {width: 16, height: 16},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
    marginHorizontal: 12,
    backgroundColor: '#FC8D08',
    // paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    marginLeft: 8,
    width: '90%',
  },
  clear: {
    flex: 2,
  },
});
