import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import AudioPlayBack from '../screens/AudioPlayBack';
import BookmarkCreation from '../screens/BookmarkCreation';
import { AUDIOPLAYBACK, BOOKMARKCREATION } from '../constants/routeNames';

export type AudioStackParamList = {
    AudioPlayBack: undefined;
    BookmarkCreation: {
        bookmarks: any[],
        id: string,
        timestamp: number,
        title: string,
    };
};

const AudioPlaybackStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={'AudioPlayback'}
            screenOptions={{
                headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.RevealFromBottomAndroidSpec,
                    close: TransitionSpecs.RevealFromBottomAndroidSpec,
                },
            }}
        >
            <Stack.Screen name={AUDIOPLAYBACK} component={AudioPlayBack} />
            <Stack.Screen name={BOOKMARKCREATION} component={BookmarkCreation} />
        </Stack.Navigator>
    )
}

export default AudioPlaybackStack