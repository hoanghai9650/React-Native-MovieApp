import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IHeaderProps {
  isBack?: boolean;
  title?: string;
  isBackground?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({
  isBack = false,
  title = '',
  isBackground = true,
}: IHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // if title is not provided and isBack is false, then return empty View
  if (!title && !isBack) {
    return (
      <View
        testID="header-view-transparent"
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            paddingTop: insets.top,
            backgroundColor: isBackground ? 'white' : 'transparent',
          },
        ]}
      />
    );
  }
  return (
    <View
      testID={'header-view'}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingTop: insets.top - 8,
          backgroundColor: isBackground ? '#FFD04D' : 'transparent',
        },
      ]}>
      {/* if isBack is true, then render TouchableOpacity with Image inside it */}
      {isBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          testID="back-button">
          <Image source={require('../assets/back.png')} style={styles.img} />
        </TouchableOpacity>
      ) : (
        <View style={styles.img} />
      )}

      <Text style={styles.title}>{title}</Text>
      <View style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: -2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: 'white',
    paddingBottom: 8,
  },
  img: {width: 28, height: 28},
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});
