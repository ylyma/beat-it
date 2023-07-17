import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {AUDIO, PLAYLIST} from '../constants/routeNames';
import Audio from '../screens/Audio';
import Playlist from '../screens/PlaylistCreation';
import PlaylistCreation from '../components/PlaylistCreation';
import PlaylistTitle from '../screens/PlaylistTitle';

const PlaylistStack: () => ReactElement = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Audio'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={AUDIO} component={PlaylistCreation} />
      <Stack.Screen name={PLAYLIST} component={PlaylistTitle} />
    </Stack.Navigator>
  );
};

export default PlaylistStack;
