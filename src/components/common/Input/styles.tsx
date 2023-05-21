import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  wrapper: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    paddingVertical: 13,
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
