import React, { createContext, useReducer } from 'react';
import { AudioProvider } from './providers/audioProvider';
import { AuthProvider } from './providers/authProvider';
import { HomeProvider } from './providers/homeProvider';

const GlobalProvider = ({ children }: any) => {

    return (
        <AuthProvider>
            <HomeProvider>
                <AudioProvider>
                    {children}
                </AudioProvider>
            </HomeProvider>
        </AuthProvider>
    );
};

export default GlobalProvider;
