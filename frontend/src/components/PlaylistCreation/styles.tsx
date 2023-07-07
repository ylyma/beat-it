import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  title: {
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
});
