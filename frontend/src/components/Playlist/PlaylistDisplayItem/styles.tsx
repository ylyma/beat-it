import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#f0e7da',
    borderRadius: 10,
    margin: 5,
    width: 300,
  },
  icon: {
    alignSelf: 'center',
    padding: 7,
    backgroundColor: '#f2d177',
    borderRadius: 10,
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    padding: 10,
  },
  play: {
    alignSelf: 'center',
    marginLeft: 'auto',
    padding: 10,
  },
});
