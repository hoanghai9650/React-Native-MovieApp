import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Cast} from 'api/types';
import {isEmpty} from 'lodash';
import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ReviewResult} from '../../../api/types';
import {Header} from '../../components';
import {useGetDetail} from '../../hook';
import {AppStackParamList, ROUTES} from '../../navigation';
type Props = NativeStackScreenProps<AppStackParamList, ROUTES.DETAIL>;

export const Detail: React.FC<Props> = ({route}: Props) => {
  const {detail, credits, reviews, keywords} = useGetDetail({
    id: route.params.id,
  });

  // render actors
  const renderCredits = useCallback(
    ({item, index}: {item: Cast}) => {
      return (
        <View style={styles.castContent}>
          <Image
            testID={`detail-actor-images-${index}`}
            source={{
              uri:
                item?.profile_path ||
                'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1719058045~exp=1719061645~hmac=84284deef65fc74575e602f22da270349a7d4e2e1d4071a9500f26e8cfe57e42&w=1380',
            }}
            style={styles.castImg}
          />
          <Text style={styles.normalText}>{item.name}</Text>
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(credits?.cast)],
  );

  // render reviews and keywords
  const RenderReviews = useCallback(
    ({item}: {item: ReviewResult}) => {
      return (
        <View style={styles.review} key={item.id.toString()}>
          <Text style={styles.reviewName}>{item.author}</Text>
          <Text style={styles.reviewContent}>{item.content}</Text>
          <Text style={styles.contentTitle}>{item.authorDetails?.name}</Text>
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(reviews?.results)],
  );

  return (
    <>
      <Header isBack title="Detail" isBackground />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Image
          source={{uri: detail?.poster_path}}
          style={styles.img}
          testID={'detail-poster'}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{detail?.title}</Text>
          <Text style={styles.normalText}>{detail?.overview}</Text>
          <Text style={styles.contentTitle}>Cast</Text>
        </View>
        <FlatList<Cast>
          keyExtractor={item => item.id.toString()}
          data={credits?.cast}
          horizontal
          style={styles.castContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCredits}
        />

        {!isEmpty(keywords?.keywords) && (
          <>
            <View style={styles.content}>
              <Text style={styles.contentTitle}>Type</Text>
            </View>

            <View style={styles.keywordContainer}>
              {keywords?.keywords.map(item => (
                <View style={styles.keywordContent} key={item.id.toString()}>
                  <Text>{item.name}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {!isEmpty(reviews?.results) && (
          <>
            <View style={styles.content}>
              <Text style={styles.contentTitle}>Review</Text>
            </View>
            <View style={styles.reviewContainer}>
              {reviews?.results.map(item => (
                <RenderReviews item={item} key={item.id} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAEE',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 56,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  normalText: {
    marginTop: 8,
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 12,
  },
  contentTitle: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  castImg: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  castContent: {
    alignItems: 'center',
    marginRight: 16,
  },
  castContainer: {
    marginTop: 16,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewContent: {
    fontSize: 14,
    marginTop: 12,
  },
  review: {
    padding: 12,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginTop: 8,
  },
  reviewContainer: {
    paddingHorizontal: 12,
  },
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  keywordContent: {
    padding: 8,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
});
