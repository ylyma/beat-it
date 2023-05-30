import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#272829",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16
    },
    text: {
        color: "white"
    }
});

interface MiniPlayerProps {
    onPress: () => void;

}

//function to get current track title from TrackPlayer
const getCurrentTrack = async () => {


    // await TrackPlayer.getCurrentTrack()
    //     .then((trackId) => {
    //         TrackPlayer.getTrack(trackId).then((track: Track) => {
    //             return track.title;
    //         });
    //     }).catch((error) => {
    //         console.log(error);
    //     });

}

const MiniPlayer = (props: MiniPlayerProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => props.onPress}>
            <View style={styles.container}>
                <Ionicons name="heart" color="white" size={24} />
                <Text style={styles.text}>
                    {/* {getCurrentTrack()} */}

                </Text>
                <Ionicons name="play-circle" color="white" size={24} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default MiniPlayer;
