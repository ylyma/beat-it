import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';
export default StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
  },
  searchRow: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  topContainer: {
    backgroundColor: colors.accent,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bottomContainer: {
    position: 'absolute',
    top: 200,
    bottom: 20,
  },
  userIcon: {
    alignSelf: 'center',
    marginLeft: 20,
    height: 40,
    width: 40,
  },
  searchBar: {
    flexBasis: 250,
  },
  title: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 25,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 20,
    paddingLeft: 40,
    paddingTop: 20,
  },
  video: {
    alignContent: 'flex-start',
    height: 150,
    width: 150,
    marginLeft: 20,
  },
  scroll: {
    padding: 20,
  },
  caption: {
    alignSelf: 'center',
  }
});
