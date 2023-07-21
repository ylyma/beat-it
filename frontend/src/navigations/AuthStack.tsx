import React, {ReactElement} from 'react';
import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';
import {LOGIN, REGISTER, RESETPASSWORD, WELCOME} from '../constants/routeNames';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Welcome from '../screens/Welcome';
import ResetPassword from '../screens/ResetPassword';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
};

const AuthStack: () => ReactElement = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={WELCOME}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.RevealFromBottomAndroidSpec,
          close: TransitionSpecs.RevealFromBottomAndroidSpec,
        },
      }}>
      <Stack.Screen name={WELCOME} component={Welcome} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTER} component={Register} />
      <Stack.Screen name={RESETPASSWORD} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
