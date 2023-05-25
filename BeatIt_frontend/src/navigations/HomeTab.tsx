import React, {ReactElement} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AUDIO, HOME, SETTINGS, VIDEO} from '../constants/routeNames';
import Home from '../screens/Home';
import Audio from '../screens/Audio';
import Video from '../screens/Video';
import Settings from '../screens/Settings';

const HomeTab: () => ReactElement = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name={HOME} component={Home} />
      <Tab.Screen name={VIDEO} component={Video} />
      <Tab.Screen name={AUDIO} component={Audio} />
      <Tab.Screen name={SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
};

export default HomeTab;
