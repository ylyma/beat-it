import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {AUDIO, PLAYLIST} from '../constants/routeNames';
import Audio from '../screens/Audio';
import Playlist from '../screens/Playlist';

const PlaylistStack: () => ReactElement = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Audio'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={AUDIO} component={Audio} />
      <Stack.Screen name={PLAYLIST} component={Playlist} />
    </Stack.Navigator>
  );
};

export default PlaylistStack;
