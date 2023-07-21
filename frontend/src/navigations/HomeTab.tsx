import React, {ReactElement} from 'react';

import {
  CardStyleInterpolators,
  StackNavigationProp,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  AUDIO,
  AUDIOPLAYBACKSTACK,
  HOME,
  PLAYLIST,
  PLAYLISTEDIT,
  PLAYLISTTRACKS,
  SETTINGS,
  VIDEO,
  VIDEOEDIT,
  VIDEOPLAYBACK,
} from '../constants/routeNames';
import Audio from '../screens/Audio';
import Video from '../screens/Video';
import Settings from '../screens/Settings';
import AudioPlaybackStack from './AudioPlaybackStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoEdit from '../screens/VideoEdit';
import VideoPlayback from '../screens/VideoPlayback';
import PlaylistTracks from '../screens/PlaylistTracksDisplay';
import PlaylistEdit from '../screens/PlaylistEdit';
import {useNavigation} from '@react-navigation/core';
import {useTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Playlist from '../screens/PlaylistCreation';

export type HomeTabParamList = {
  Home: undefined;
  Video: undefined;
  Audio: undefined;
  Settings: undefined;
  Playlist: undefined;
  VideoEdit: undefined;
  VideoPlayback: undefined;
  AudioPlayBackStack: undefined;
};

const HomeTab: () => ReactElement = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  const colors = useTheme().colors;

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabBottom" options={{headerShown: false}}>
        {() => (
          <Tab.Navigator
            activeColor={colors.primary}
            inactiveColor={colors.light}
            initialRouteName={VIDEO}
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
                  <Ionicons name={iconName} size={20} color={colors.primary} />
                );
              },
              tabBarLabelStyle: {
                fontSize: 12,
                padding: 5,
              },
              tabBarStyle: {
                height: 60,
              },
              headerShown: false,
            })}>
            {/* <Tab.Screen name={HOME} component={Home} /> */}
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
        name={PLAYLISTTRACKS}
        component={PlaylistTracks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={PLAYLISTEDIT}
        component={PlaylistEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AUDIOPLAYBACKSTACK}
        component={AudioPlaybackStack}
        options={{
          headerShown: false,
          animationEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          transitionSpec: {
            open: TransitionSpecs.RevealFromBottomAndroidSpec,
            close: TransitionSpecs.RevealFromBottomAndroidSpec,
          },
        }}
      />
      <Stack.Screen
        name={VIDEOEDIT}
        component={VideoEdit}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: TransitionSpecs.RevealFromBottomAndroidSpec,
            close: TransitionSpecs.RevealFromBottomAndroidSpec,
          },
          title: 'Video Edit',
        }}
      />
      <Stack.Screen
        name={VIDEOPLAYBACK}
        component={VideoPlayback}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => Navigation.navigate(VIDEOEDIT)}>
              <Ionicons
                name="create-outline"
                size={30}
                color={colors.primary}
                style={{paddingRight: 10}}
              />
            </TouchableOpacity>
          ),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: TransitionSpecs.RevealFromBottomAndroidSpec,
            close: TransitionSpecs.RevealFromBottomAndroidSpec,
          },
          title: 'Video Playback',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
