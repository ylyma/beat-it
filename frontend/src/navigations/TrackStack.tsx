import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {AUDIO, TRACK} from '../constants/routeNames';

const Audio: () => ReactElement = () => {
  return (
    <View>
      <Text>Audio</Text>
    </View>
  );
};

const Track: () => ReactElement = () => {
  return (
    <View>
      <Text>Track</Text>
    </View>
  );
};

const TrackStack: () => ReactElement = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={AUDIO} component={Audio} />
      <Stack.Screen name={TRACK} component={Track} />
    </Stack.Navigator>
  );
};

export default TrackStack;
