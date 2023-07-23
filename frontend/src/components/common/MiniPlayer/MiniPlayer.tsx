import React, { useContext } from "react";
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import TrackPlayer, { Track, useTrackPlayerEvents, Event, State } from "react-native-track-player";
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { AudioContext } from "../../../context/providers/audioProvider";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeTabParamList } from "../../../navigations/HomeTab";
import { useTheme } from "@react-navigation/native";

const MiniPlayer = () => {
    const audioContext = useContext(AudioContext);
    const colors = useTheme().colors;

    const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
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
        <Animated.View style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("AudioPlayBackStack")}>
                <Text style={[styles.text,]}>
                    {audioContext.currentTrack}
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => playPause()}>
                <Ionicons name={audioContext.playIcon} color="white" size={24} />
            </TouchableWithoutFeedback>
        </Animated.View>
    );
};

export default MiniPlayer;
