import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TrackPlayer, { useTrackPlayerEvents, Event, State } from 'react-native-track-player'


type TrackButtonProps = {
    trackName: string,
    // size: number
    trackSource: string | number
    artist: string
}

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
];

const TrackButton = (props: TrackButtonProps) => {
    const [currentTrack, setCurrentTrack] = React.useState("No Track Playing");
    const [playing, setPlaying] = React.useState(true);
    const [playIcon, setPlayIcon] = React.useState("play");

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn('An error occured while playing the current track.');
        }
        if (event.type === Event.PlaybackState) {
            setPlaying(event.state === State.Playing);
            // console.log(playing);
        }
        if (playing) {
            setPlayIcon("play");
        }
        else {
            setPlayIcon("pause");
        }
    });


    const playPause = () => {
        if (playing) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
    };
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={
                () => TrackPlayer.add({ title: props.trackName, url: props.trackSource, artist: props.artist }).then(
                    () => playPause()
                )}>
                <View style={styles.buttonIcon}>
                    <Ionicons name={playIcon} size={20} />
                </View>
            </TouchableOpacity>
            <Text style={styles.caption}>{props.trackName}</Text>
        </View>
    )
}

export default TrackButton