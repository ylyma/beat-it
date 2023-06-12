import React, { useContext } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import TrackPlayer, { Track, useTrackPlayerEvents, Event, State } from "react-native-track-player";
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { AudioContext } from "../../../context/providers/audioProvider";

const MiniPlayer = () => {
    const audioContext = useContext(AudioContext);

    const navigation = useNavigation();
    const playPause = () => {
        if (audioContext.playing) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
    };

    if (audioContext.noTrack === true) {
        return (
            <View></View>
        );
    }
    return (
        <View style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={() => null}>

                <Ionicons name="heart" color="white" size={24} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("AudioPlayBackStack")}>
                <Text style={styles.text}>
                    {audioContext.currentTrack}
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => playPause()}>
                <Ionicons name={audioContext.playIcon} color="white" size={24} />
            </TouchableWithoutFeedback>
        </View>
    );
};

export default MiniPlayer;
