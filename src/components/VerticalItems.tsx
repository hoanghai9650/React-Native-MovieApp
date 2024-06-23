import {useNavigation} from '@react-navigation/native';
import {Movie} from 'api/types';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ROUTES} from '../navigation';

export const VerticalItems: React.FC<Movie> = props => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(ROUTES.DETAIL, {id: props.id} as {id: number});
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      testID="vertical-list-item">
      <Image
        source={{uri: props.poster_path}}
        style={styles.img}
        testID="vertical-list-image"
      />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 12,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#FFD04D',
  },
  img: {
    width: 54,
    height: 54,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    width: '80%',
  },
});
