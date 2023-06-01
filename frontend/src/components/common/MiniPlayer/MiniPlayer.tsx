import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import TrackPlayer, { Track, useTrackPlayerEvents, Event, State } from "react-native-track-player";
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from "./styles";

//function to get current track title from TrackPlayer
const getCurrentTrack = async () => {


    let title = await TrackPlayer.getCurrentTrack()
        .then((trackId) => {
            return TrackPlayer.getTrack(trackId!);
        }).then((track) => {
            return track!.title;
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

    getCurrentTrack().then((title) => {
        setCurrentTrack(title!);
    }).catch((error) => {
        console.log(error);
    });
    return (
        <View style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={() => props.onPress}>

                <Ionicons name="heart" color="white" size={24} />
            </TouchableWithoutFeedback>

            <Text style={styles.text}>
                {currentTrack}
            </Text>
            <TouchableWithoutFeedback onPress={() => playPause()}>
                <Ionicons name={playIcon} color="white" size={24} />
            </TouchableWithoutFeedback>
        </View>
    );
};

export default MiniPlayer;
