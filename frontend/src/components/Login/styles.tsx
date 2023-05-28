import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  logo: {
    padding: 10,
    alignItems: 'center',
    margin: 5,
    height: 30,
    width: 29,
  },
  text: {
    padding: 10,
    textAlign: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  footer: {
    marginBottom: 150,
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.black,
    fontSize: 20,
  },
  button: {
    width: 60,
    alignSelf: 'center',
  }
});
