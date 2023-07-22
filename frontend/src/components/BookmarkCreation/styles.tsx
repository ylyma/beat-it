import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';
const styles = StyleSheet.create({
  top: {
    justifyContent: 'center',
    width: 300,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.colors.primary,
    alignItems: 'center',
    padding: '10%',
  },
  input: {
    width: '100%',
    backgroundColor: colors.colors.lightgrey,
    borderRadius: 8,
    borderColor: colors.colors.white,
    paddingHorizontal: 20,
    fontSize: 15,
    color: colors.colors.black,
    marginBottom: 10,
  },
  button: {
    width: 170,
    backgroundColor: colors.colors.secondary,
    borderRadius: 10,
    borderColor: colors.colors.black,
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.colors.white,
    marginBottom: 10,
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default styles;

