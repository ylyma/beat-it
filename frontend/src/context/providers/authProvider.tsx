import React, { Dispatch, createContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer';

interface authInterface {
    isLoggedIn: boolean,
    user: any,
    dispatch: Dispatch<any>,
};

export const authInit = {
    isLoggedIn: false,
    user: null,
    dispatch: () => { },
};


export const AuthContext = createContext<authInterface>(authInit);


export const AuthProvider = ({ children }: any) => {
    const [AuthState, AuthDispatch] = useReducer(authReducer, authInit);
    AuthState.dispatch = AuthDispatch;

    return (
        <AuthContext.Provider
            value={
                AuthState
            }>
            {children}
        </AuthContext.Provider >
    );
}