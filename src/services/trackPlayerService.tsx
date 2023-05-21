import TrackPlayer from 'react-native-track-player';
import { Event } from 'react-native-track-player';
import { NativeModules } from 'react-native/types';

// async function trackPlayerService() {
//     TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
//     TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
// };

module.exports = async function () {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
};

// export default trackPlayerService;