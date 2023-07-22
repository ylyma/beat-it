import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary,
    alignItems: 'center',
    padding: '10%',
  },
  input: {
    width: '100%',
    // backgroundColor: colors.lightgrey,
    borderRadius: 8,
    // borderColor: colors.white,
    paddingHorizontal: 20,
    fontSize: 16,
    // color: colors.black,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    // backgroundColor: colors.secondary,
    borderRadius: 8,
    // borderColor: colors.black,
    paddingHorizontal: 20,
    fontSize: 16,
    // color: colors.black,
    marginBottom: 10,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
