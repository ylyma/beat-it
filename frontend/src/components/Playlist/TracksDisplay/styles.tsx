import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    color: colors.black,
  },
  back: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  play: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  playRow: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menu: {
    marginLeft: 'auto',
    flexDirection: 'row',
    paddingRight: 5,
  },
  delete: {
    color: colors.failure,
  },
  queueText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 15,
    color: colors.white,
  },
  bottom: {
    backgroundColor: '#f2ece4',
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    paddingBottom: 15,
  },
  bottomContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    margin: 20,
    width: 150,
    alignSelf: 'center',
  },
  queueItem: {
    alignSelf: 'center',
    padding: 5,
  },
  wordRow: {
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  word: {
    fontSize: 12,
  },
});
