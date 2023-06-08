import React, { createContext, useReducer } from 'react';
import homeReducer from '../reducers/homeReducer';

export const homeInit = {
    user: {
        name: {},
    },
    getRecents: {
        date: {},
        error: null,
        loading: null,
    },
    getFavourites: {
        date: {},
        error: null,
        loading: null,
    },
};


export const HomeContext = createContext(homeInit);
export const HomeDispatchContext = createContext<any>(null);

export const HomeProvider = ({ children }: any) => {
    const [homeState, homeDispatch] = useReducer(homeReducer, homeInit);

    return (
        <HomeContext.Provider
            value={
                homeState
            }>
            <HomeDispatchContext.Provider value={homeDispatch}>
                {children}
            </HomeDispatchContext.Provider>
        </HomeContext.Provider >
    );
}