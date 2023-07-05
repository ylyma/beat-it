const videoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VIDEO':
            return {
                ...state,
                video: action.payload,
            };
        case 'SET_VIDEO_PLAYER':
            return {
                ...state,
                videoPlayer: action.payload,
            };
        case 'TOGGLE_PAUSE':
            return {
                ...state,
                paused: !state.paused,
                playIcon: state.paused ? 'pause' : 'play',
            };
        case 'SET_PAUSE':
            return {
                ...state,
                paused: action.payload,
                playIcon: action.payload ? 'play' : 'pause',
            };
        case 'SET_TIME':
            return {
                ...state,
                currentTime: action.payload.currentTime,
                totalDuration: action.payload.seekableDuration,
            };
        default:
            return state;
    }
};

export default videoReducer;