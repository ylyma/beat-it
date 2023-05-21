import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { useEffect } from 'react';

TrackPlayer.setupPlayer()

TrackPlayer.updateOptions({
    capabilities: [
        Capability.Play,
        Capability.Pause,
    ],
    compactCapabilities: [
        Capability.Play,
        Capability.Pause,
    ]
});


const tracks = [
    {
        id: '1',
        url: require('../../../test_data/audio/yeeling_item.mp3'),
        title: 'Track 1',
        artist: 'Artist 1',
    },
];

TrackPlayer.add(tracks);
console.log("ready to play")



const Audio: () => ReactElement = () => {

    // const setupTrackPlayer = async () => {
    //     await TrackPlayer.setupPlayer();
    //     await TrackPlayer.add(tracks);
    // };
    // useEffect(() => {
    //     setupTrackPlayer();
    // });

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => TrackPlayer.play()}>
                    <Text>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => TrackPlayer.pause()}>
                    <Text>Pause</Text>
                </TouchableOpacity>
            </View>

            <Text>Audio</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#555',
        padding: 10,
        borderRadius: 5,
    },
});

export default Audio;
