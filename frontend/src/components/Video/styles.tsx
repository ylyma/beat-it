import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  videoPlayer: {
    width: '100%',
    height: 300,
  },
  addButton: {
    borderRadius: 10,
    height: 30,
    width: 120,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  titleAndButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
  },
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  refresh: {
    alignSelf: 'center',
    paddingLeft: 120,
  },
  videoTitle: {
    textAlign: 'center',
    fontSize: 20,
    paddingLeft: 10,
  },
  videoContainer: {
    paddingLeft: 15,
  },
});
