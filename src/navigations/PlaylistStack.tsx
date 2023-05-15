import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {AUDIO, PLAYLIST} from '../constants/routeNames';

const Audio: () => ReactElement = () => {
  return (
    <View>
      <Text>Audio</Text>
    </View>
  );
};

const Playlist: () => ReactElement = () => {
  return (
    <View>
      <Text>Playlist</Text>
    </View>
  );
};

const PlaylistStack: () => ReactElement = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={AUDIO} component={Audio} />
      <Stack.Screen name={PLAYLIST} component={Playlist} />
    </Stack.Navigator>
  );
};

export default PlaylistStack;
