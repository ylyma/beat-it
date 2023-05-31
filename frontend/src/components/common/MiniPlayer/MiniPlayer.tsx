import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import TrackPlayer, { Track, useTrackPlayerEvents, Event, State } from "react-native-track-player";
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from "./styles";

//function to get current track title from TrackPlayer
const getCurrentTrack = async () => {


    let title = await TrackPlayer.getCurrentTrack()
        .then((trackId) => {
            return TrackPlayer.getTrack(trackId);
        }).then((track) => {
            return track.title;
        }).catch((error) => {
            console.log(error);
            return "No Track Playing"
        });

    return title;
}


interface MiniPlayerProps {
    onPress: () => void;
}
const events = [
    Event.PlaybackState,
    Event.PlaybackError,
];

const MiniPlayer = (props: MiniPlayerProps) => {
    const [currentTrack, setCurrentTrack] = React.useState("No Track Playing");
    const [playing, setPlaying] = React.useState(true);
    const [playIcon, setPlayIcon] = React.useState("play-circle");

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            console.warn('An error occured while playing the current track.');
        }
        if (event.type === Event.PlaybackState) {
            setPlaying(event.state === State.Playing);
            console.log(playing);
        }
        if (playing) {
            setPlayIcon("play-circle");
        }
        else {
            setPlayIcon("pause-circle");
        }
    });

    getCurrentTrack().then((title) => {
        setCurrentTrack(title);
    }).catch((error) => {
        console.log(error);
    });
    return (
        <TouchableWithoutFeedback onPress={() => props.onPress}>
            <View style={styles.wrapper}>
                <Ionicons name="heart" color="white" size={24} />
                <Text style={styles.text}>
                    {currentTrack}
                </Text>
                <Ionicons name={playIcon} color="white" size={24} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default MiniPlayer;
