import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTab from './HomeTab';
import AuthStack from './AuthStack';
import {createStackNavigator} from '@react-navigation/stack';

type AppNavProps = {
  children: React.ReactNode;
};

const Stack = createStackNavigator();

const AppNavContainer: (props: AppNavProps) => ReactElement = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavContainer;
