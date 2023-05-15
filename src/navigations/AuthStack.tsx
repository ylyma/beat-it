import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LOGIN, REGISTER} from '../constants/routeNames';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack: () => ReactElement = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTER} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
