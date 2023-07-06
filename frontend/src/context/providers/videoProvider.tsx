import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import videoReducer from '../reducers/videoReducer';
import Video from 'react-native-video';

type video = {
  uri: string;
  name: string;
};

interface videoInterface {
  video: video;
  videoPlayer: Video | null;
  paused: boolean;
  currentTime: number;
  totalDuration: number;
  playIcon: string;
  dispatch: Dispatch<any>;
}

export const videoInit = {
  video: {
    uri: '',
    name: '',
  },
  videoPlayer: null,
  paused: false,
  currentTime: 0,
  totalDuration: 0,
  playIcon: 'pause',
  dispatch: () => {},
};

export const VideoContext = createContext<videoInterface>(videoInit);

export const VideoProvider = ({children}: any) => {
  const [videoState, videoDispatch] = useReducer(videoReducer, videoInit);
  videoState.dispatch = videoDispatch;

  return (
    <VideoContext.Provider value={videoState}>{children}</VideoContext.Provider>
  );
};
