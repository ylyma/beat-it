import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  wrapper: {
    height: 40,
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    paddingTop: '6%',
    paddingHorizontal: '5%',
  },
  label: {
    color: colors.black,
    paddingBottom: 5,
  },
  icon: {
    paddingHorizontal: 10,
  },
  error: {
    color: colors.failure,
    paddingTop: 4,
    fontSize: 12,
  },
});
