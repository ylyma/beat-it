import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  playlistTitle: {
    fontSize: 30,
    alignSelf: 'center',
    padding: 20,
    color: colors.black,
  },
  button: {
    width: 100,
    alignSelf: 'center',
    borderRadius: 10,
    height: 35,
  },
  topList: {
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.grey,
    alignSelf: 'center',
    paddingTop: 15,
  },
  list: {
    paddingBottom: 15,
  },
});
