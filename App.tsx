import React, { ReactNode } from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';

const App: () => ReactNode = () => {
  return (
    <GlobalProvider>
      <AppNavContainer children={undefined} />
    </GlobalProvider>
  );
};

export default App;
