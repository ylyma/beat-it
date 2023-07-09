import React, { createContext, useReducer } from 'react';
import { AudioProvider } from './providers/audioProvider';
import { AuthProvider } from './providers/authProvider';
import { HomeProvider } from './providers/homeProvider';
import { VideoProvider } from './providers/videoProvider';

const GlobalProvider = ({ children }: any) => {

    return (
        <AuthProvider>
            <HomeProvider>
                <AudioProvider>
                    <VideoProvider>
                        {children}
                    </VideoProvider>
                </AudioProvider>
            </HomeProvider>
        </AuthProvider>
    );
};

export default GlobalProvider;
