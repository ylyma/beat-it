import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '5%',
  },
  icon: {
    fontSize: 50,
    alignSelf: 'center',
    padding: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  progressBar: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  bookmarkCaption: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '500',
  },
  caption: {
    fontSize: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bookmarkContainer: {
    flex: 1,
    padding: '5%',
    marginBottom: 10,
  },
  timeAndBookmarkContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookmark: {
    fontSize: 40,
    alignSelf: 'center',
    marginLeft: 10,
  },
  time: {
    fontSize: 15,
    alignSelf: 'center',
    marginRight: 10,
  },
  back: {
    paddingBottom: 10,
  },
  bookmarkDisplay: {
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  bookmarkTime: {
    alignSelf: 'center',
    fontSize: 15,
  },
  delete: {
    paddingRight: 5,
    marginRight: 15,
    alignSelf: 'center',
  },
  refresh: {
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  bookmarksRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default styles;
