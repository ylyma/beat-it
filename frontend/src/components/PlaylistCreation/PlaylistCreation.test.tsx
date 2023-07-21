/**
 * @format
 */

// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import PlaylistCreationComponent from '.';
import { NavigationScreenProp } from "react-navigation";
import { BaseNavigationContainer } from '@react-navigation/core';

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

it('renders correctly', () => {


    renderer.create(<BaseNavigationContainer>
        <PlaylistCreationComponent />
    </BaseNavigationContainer>);
});
