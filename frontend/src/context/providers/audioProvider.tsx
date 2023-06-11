import React, { createContext, useReducer, Dispatch, useEffect } from 'react';
import audioReducer from '../reducers/audioReducer';
import TrackPlayer, { useTrackPlayerEvents, Event, State, useProgress } from 'react-native-track-player';

interface audioInterface {
    currentTrack: string;
    currentArtist: string;
    playing: boolean;
    playIcon: string;
    position: string;
    duration: string;
    noTrack: boolean;
    format: (seconds: number) => string;
    dispatch: Dispatch<any>;
};

export const audioInit = {
    currentTrack: "No Track Playing",
    currentArtist: "",
    playing: false,
    playIcon: "play-circle",
    position: '0:00',
    duration: '0:00',
    noTrack: true,
    format: () => '',
    dispatch: () => { },
};

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackTrackChanged,
    Event.PlaybackProgressUpdated,
    Event.PlaybackTrackChanged,
];

function format(seconds) {
    let mins = (Math.floor(parseInt(seconds) / 60)).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

export const AudioContext = createContext<audioInterface>(audioInit);

export const AudioProvider = ({ children }: any) => {
    const [audioState, audioDispatch] = useReducer(audioReducer, audioInit);
    const { position, duration } = useProgress();
    audioState.format = format;
    audioState.dispatch = audioDispatch;

    useTrackPlayerEvents(events, async (event) => {
        console.log(event.type);
        if (event.type === Event.PlaybackError) {
            console.warn('An error occured while playing the current track.');
        }

        if (event.type === Event.PlaybackState || event.type === Event.PlaybackTrackChanged) {
            let artist;
            const title = await TrackPlayer.getCurrentTrack()
                .then((trackId) => {
                    return TrackPlayer.getTrack(trackId!);
                }).then((track) => {
                    artist = track!.artist;
                    return track!.title;
                }).catch((error) => {
                    console.log(error);
                    return "No Track Playing"
                });
            audioDispatch(
                {
                    type: 'SET_CURRENT_TRACK',
                    payload: title,
                }
            );
            audioDispatch(
                {
                    type: 'SET_CURRENT_ARTIST',
                    payload: artist,
                }
            );
            audioDispatch(
                {
                    type: 'SET_NO_TRACK',
                    payload: false,
                });
            audioDispatch(
                {
                    type: 'SET_PLAYING',
                    payload: event.state === State.Playing,
                }
            );
            audioDispatch(
                {
                    type: 'SET_DURATION',
                    payload: format(duration),
                }
            );
            if (event.state === State.Playing) {
                audioDispatch(
                    {
                        type: 'SET_PLAY_ICON',
                        payload: "pause-circle",
                    }
                );
            }
            else {
                audioDispatch(
                    {
                        type: 'SET_PLAY_ICON',
                        payload: "play-circle",
                    }
                );
            }
        }
        if (event.type === Event.PlaybackTrackChanged) {
            audioDispatch(
                {
                    type: 'SET_DURATION',
                    payload: format(duration),
                }
            );
        }
    });

    return (
        <AudioContext.Provider
            value={
                audioState
            }>
            {children}
        </AudioContext.Provider >
    );
}