import React, {ReactElement, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTab from './HomeTab';
import AuthStack from './AuthStack';
import {Header, createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/providers/authProvider';
import {useColorScheme} from 'react-native';
import colors from '../assets/themes/colors';
import darkColors from '../assets/themes/darkColors';

type AppNavProps = {
  children: React.ReactNode;
};

const stack = createStackNavigator();

const AppNavContainer: (props: AppNavProps) => ReactElement = () => {
  const authContext = useContext(AuthContext);
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? darkColors : colors}>
      {authContext.isLoggedIn ? <HomeTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
