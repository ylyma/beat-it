/**
 * @format
 */

// import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AuthContainer from './index'
import { NavigationScreenProp } from "react-navigation";
import { BaseNavigationContainer } from '@react-navigation/core';


type NavigationScreenPropAlias = NavigationScreenProp<{}>;
let navigation: Partial<NavigationScreenPropAlias>;
beforeEach(() => {
    navigation = {
        dispatch: jest.fn()
    }
});

it('renders correctly', async () => {


    await renderer.create(<BaseNavigationContainer>
        <AuthContainer />
    </BaseNavigationContainer>);
});
