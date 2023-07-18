const audioReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_CURRENT_TRACK':
            return {
                ...state,
                currentTrack: action.payload
            };
        case 'SET_CURRENT_ARTIST':
            return {
                ...state,
                currentArtist: action.payload
            };
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.payload
            };
        case 'SET_PLAY_ICON':
            return {
                ...state,
                playIcon: action.payload
            };
        case 'SET_POSITION':
            return {
                ...state,
                position: action.payload
            };
        case 'SET_DURATION':
            return {
                ...state,
                duration: action.payload
            };
        case 'SET_NO_TRACK':
            return {
                ...state,
                noTrack: action.payload
            };
        default:
            return state;
    }
};

export default audioReducer;