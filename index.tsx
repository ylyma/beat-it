/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('TrackPlayer', () => require('./src/services/trackPlayerService'));
TrackPlayer.registerPlaybackService(() => require('./src/services/trackPlayerService'));