import React, {createContext, useReducer} from 'react';
import auth from './reducers/auth';
import authInit from './initialStates/authInit';
import homeInit from './initialStates/homeInit';
import home from './reducers/home';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}: any) => {
  const [authState, authDispatch] = useReducer(auth, authInit);
  const [homeState, homeDispatch] = useReducer(home, homeInit);
  return (
    <GlobalContext.Provider
      value={{authState, homeState, authDispatch, homeDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
