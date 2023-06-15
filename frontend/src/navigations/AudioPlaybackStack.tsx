import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AudioPlayBack from '../screens/AudioPlayBack';
import BookmarkCreation from '../screens/BookmarkCreation';
import { AUDIOPLAYBACK, BOOKMARKCREATION } from '../constants/routeNames';

const AudioPlaybackStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={'AudioPlayback'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={AUDIOPLAYBACK} component={AudioPlayBack} />
            <Stack.Screen name={BOOKMARKCREATION} component={BookmarkCreation} />
        </Stack.Navigator>
    )
}

export default AudioPlaybackStack