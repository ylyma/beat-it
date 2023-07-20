import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  item: {
    width: 135,
    height: 170,
    borderRadius: 10,
    backgroundColor: '#f0e7da',
    marginHorizontal: 10,
  },
  icon: {
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  inside: {
    alignSelf: 'center',
    width: 100,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#f2d177',
  },
  text: {
    alignSelf: 'center',
    color: colors.black,
    paddingTop: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  play: {
    backgroundColor: colors.white,
    borderRadius: 7,
    padding: 5,
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    marginRight: 5,
    marginLeft: 12,
  },
  delete: {
    color: colors.failure,
  },
  back: {
    marginHorizontal: 5,
  },
  menu: {
    marginRight: 'auto',
    //flexDirection: 'row',
    padding: 3,
    marginTop: 5,
  },
  insideRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 18,
    marginTop: 3,
  },
});
