import {Movie} from 'api/types';
import React, {useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header, SearchBar, VerticalItems} from '../../components';
import {useGetMovies} from '../../hook';
import {useSearchMovies} from '../../hook/useSearchMovies';
import {styles} from './styles';
const {width} = Dimensions.get('window');

export const Home: React.FC = () => {
  const {movies} = useGetMovies();
  const [search, setSearch] = React.useState<string>('');

  const {handleSearch, searchResults} = useSearchMovies();

  const handleChangeSearch = (text: string) => {
    setSearch(text);
    handleSearch(text);
  };

  // for carousel
  const headerComponent = useCallback(
    () => {
      return (
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Popular Movies</Text>
          <ScrollView
            horizontal={true}
            indicatorStyle={undefined}
            decelerationRate={0}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            disableIntervalMomentum={true}
            snapToInterval={width - 26}>
            {movies?.slice(0, 3).map((item, index) => (
              <View
                key={index}
                testID={`movie-${index}`}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  paddingLeft: width * 0.1,
                  paddingRight:
                    index === movies.slice(0, 3).length - 1 ? width * 0.1 : 0,
                }}>
                <Image source={{uri: item.poster_path}} style={styles.img} />
                <Text testID={'x'} style={styles.title}>
                  {item.title}
                </Text>
              </View>
            ))}
          </ScrollView>
          <Text style={[styles.headerTitle, {marginTop: 12}]}>Now Showing</Text>
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(movies)],
  );

  const renderItem = useCallback(
    ({item}: {item: Movie}) => {
      return (
        <View style={styles.itemContainer}>
          <VerticalItems {...item} />
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(movies)],
  );

  return (
    <SafeAreaProvider testID="Home">
      <View style={styles.container}>
        <Header isBackground={false} />
        <SearchBar text={search} onChangeText={handleChangeSearch} />

        <FlatList<Movie>
          testID="home-list"
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.contentContainer}
          style={styles.list}
          data={search ? searchResults : movies}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={search ? null : headerComponent}
        />
      </View>
    </SafeAreaProvider>
  );
};
