import React, {ReactElement} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AUDIO, HOME, SETTINGS, VIDEO} from '../constants/routeNames';
import Home from '../screens/Home';
import Audio from '../screens/Audio';
import Video from '../screens/Video';
import Settings from '../screens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/themes/colors';

const HomeTab: () => ReactElement = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      activeColor={colors.accent}
      inactiveColor={colors.grey}
      initialRouteName={HOME}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === HOME) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === VIDEO) {
            iconName = focused ? 'ios-videocam' : 'ios-videocam-outline';
          } else if (route.name === AUDIO) {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else if (route.name === SETTINGS) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={20} color={colors.accent} />;
        },
      })}>
      <Tab.Screen name={HOME} component={Home} />
      <Tab.Screen name={VIDEO} component={Video} />
      <Tab.Screen name={AUDIO} component={Audio} />
      <Tab.Screen name={SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
};

export default HomeTab;
