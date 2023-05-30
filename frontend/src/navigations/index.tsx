import React, { ReactElement, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './HomeTab';
import AuthStack from './AuthStack';
import { GlobalContext } from '../context/Provider';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Header, createStackNavigator } from '@react-navigation/stack';
import { BackHandler } from 'react-native/types';


type AppNavProps = {
    children: React.ReactNode;
};

const stack = createStackNavigator();

const AppNavContainer: (props: AppNavProps) => ReactElement = () => {
    return (
        <NavigationContainer>
            <stack.Navigator >
                <stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />

                <stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />

            </stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavContainer;