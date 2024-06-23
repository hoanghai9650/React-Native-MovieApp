import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFAEE'},
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 56,
  },
  img: {
    width: width * 0.8,
    height: width * 1,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 8,
  },
  itemContainer: {
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
});
