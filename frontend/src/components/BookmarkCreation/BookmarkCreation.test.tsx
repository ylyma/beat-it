/**
 * @format
 */

// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import BookmarkCreationComponent from './index';
import { NavigationScreenProp } from "react-navigation";
import { BaseNavigationContainer } from '@react-navigation/core';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android', // or 'ios'
    select: () => null
}));

type NavigationScreenPropAlias = NavigationScreenProp<{}>;
let navigation: Partial<NavigationScreenPropAlias>;
beforeEach(() => {
    navigation = {
        dispatch: jest.fn()
    }
});

jest.mock('NativeModules', () => ({
    UIManager: {
        RCTView: () => { },
    },
    RNGestureHandlerModule: {
        attachGestureHandler: jest.fn(),
        createGestureHandler: jest.fn(),
        dropGestureHandler: jest.fn(),
        updateGestureHandler: jest.fn(),
        State: {},
        Directions: {},
    },
}))

export type AudioStackParamList = {
    AudioPlayBack: undefined;
    BookmarkCreation: {
        bookmarks: any[],
        id: string,
        timestamp: number,
        title: string,
    };
};

it('renders correctly', () => {
    const stack = createStackNavigator<StackNavigationProp<AudioStackParamList>>();

    renderer.create(<BaseNavigationContainer>
        <stack.Navigator>
            <stack.Screen name="BookmarkCreationComponent" component={BookmarkCreationComponent} />
        </stack.Navigator>
    </BaseNavigationContainer>);
});
