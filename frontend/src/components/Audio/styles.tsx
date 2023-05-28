import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 120,
    backgroundColor: colors.lightgrey,
  },
  playlist: {
    alignContent: 'flex-start',
    height: 150,
    width: 150,
    marginRight: 20,
  },
  scroll: {
    paddingVertical: 20,
  },
  caption: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 10,
  },
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tracks: {
    paddingRight: 15,
  }
});
