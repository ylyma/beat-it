import React, {ReactElement} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AUDIO,
  AUDIOPLAYBACK,
  AUDIOPLAYBACKSTACK,
  HOME,
  PLAYLIST,
  PLAYLISTSTACK,
  SETTINGS,
  VIDEO,
  VIDEOEDIT,
  VIDEOPLAYBACK,
} from '../constants/routeNames';
import Home from '../screens/Home';
import Audio from '../screens/Audio';
import Video from '../screens/Video';
import Settings from '../screens/Settings';
import AudioPlaybackStack from './AudioPlaybackStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/themes/colors';
import VideoEdit from '../screens/VideoEdit';
import VideoPlayback from '../screens/VideoPlayback';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import PlaylistStack from './PlaylistStack';
import Playlist from '../screens/Playlist';

const HomeTab: () => ReactElement = () => {
  const Tab = createMaterialBottomTabNavigator();
  const Stack = createStackNavigator();
  const Navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabBottom" options={{headerShown: false}}>
        {() => (
          <Tab.Navigator
            activeColor={colors.accent}
            inactiveColor={colors.grey}
            initialRouteName={HOME}
            screenOptions={({route}) => ({
              tabBarIcon: ({focused}) => {
                let iconName;

                if (route.name === HOME) {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === VIDEO) {
                  iconName = focused ? 'ios-videocam' : 'ios-videocam-outline';
                } else if (route.name === AUDIO) {
                  iconName = focused
                    ? 'musical-notes'
                    : 'musical-notes-outline';
                } else if (route.name === SETTINGS) {
                  iconName = focused ? 'settings' : 'settings-outline';
                }

                return (
                  <Ionicons name={iconName} size={20} color={colors.accent} />
                );
              },
            })}>
            <Tab.Screen name={HOME} component={Home} />
            <Tab.Screen name={VIDEO} component={Video} />
            <Tab.Screen name={AUDIO} component={Audio} />
            <Tab.Screen name={SETTINGS} component={Settings} />
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={PLAYLIST}
        component={Playlist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AUDIOPLAYBACKSTACK}
        component={AudioPlaybackStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name={VIDEOEDIT} component={VideoEdit} />
      <Stack.Screen
        name={VIDEOPLAYBACK}
        component={VideoPlayback}
        options={{
          headerRight: () => (
            <Button
              onPress={() => Navigation.navigate(VIDEOEDIT)}
              title="edit"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
