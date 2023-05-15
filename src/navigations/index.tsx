import React, {ReactElement, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeTab from './HomeTab';
import AuthStack from './AuthStack';
import {GlobalContext} from '../context/Provider';

type AppNavProps = {
  children: React.ReactNode;
};

const AppNavContainer: (props: AppNavProps) => ReactElement = () => {
  const {
    authState: {isLoggedIn},
  }: any = useContext(GlobalContext);

  console.log('state:', isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
