import React, { ReactElement, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageSourcePropType, Button } from 'react-native';
import TrackPlayer, { Capability, State, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { useEffect } from 'react';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';
import HorizView from '../common/HorizView/HorizView';
import TrackButton from './TrackButton';
import TrackContainerGen from './TrackContainerGen';

// TrackPlayer.updateOptions({
//     capabilities: [Capability.Play, Capability.Pause],
//     compactCapabilities: [Capability.Play, Capability.Pause],
// });

//TODO: add bottom bar with play/pause button and track info

// const tracks = [
//     {
//         id: '1',
//         url: require('../../test_data/audio/yeeling_item.mp3'),
//         title: 'evo yeeling',
//         artist: 'yeeling',
//     },
//     {
//         id: '2',
//         url: require('../../test_data/audio/hunted.mp3'),
//         title: 'Hunted',
//         artist: 'Sid',
//     },
//     {
//         id: '3',
//         url: require('../../test_data/audio/floor_luigis.mp3'),
//         title: 'Floor Luigis',
//         artist: 'NUS DE',
//     },
//     {
//         id: '4',
//         url: require('../../test_data/audio/rag.mp3'),
//         title: 'bizrag',
//         artist: 'Rag',
//     },
//     {
//         id: '5',
//         url: require('../../test_data/audio/waves.mp3'),
//         title: 'Waves',
//         artist: 'Dean Lewis',
//     },
//     {
//         id: '6',
//         url: require('../../test_data/audio/standing_luigis.mp3'),
//         title: 'Standing Luigis',
//         artist: 'NUS DE',
//     },
// ];

const tracks = [];


const AudioComponent: () => ReactElement = () => {
    // wrap this in a useEffect to make sure it only runs once and async
    useEffect(() => {
        async function setup() {
            await TrackPlayer.setupPlayer().catch((error) => {
                // console.log(1);
                console.log(error);
            });
            // await TrackPlayer.add(tracks).catch((error) => {
            //     console.log(2);
            //     console.log(error);
            // });
        }

        setup().then(() => {
            console.log('setup complete');
        });
    }, []);


    // read the id3 tags from a list of mp3 files

    // generate TrackButtons from list of mp3 files



    return (
        <Container>
            <SearchBar
                icon={<Ionicons name="search" />}
                iconPosition="left"
                placeholder="Search"
            />
            <Text style={styles.subtitle}>Playlists</Text>
            <ScrollView style={styles.scroll} horizontal>

                <HorizView image_src={require('../../assets/images/playlistplaceholder.png')} caption='playlist1' />

                <HorizView image_src={require('../../assets/images/playlistplaceholder.png')} caption='playlist2' />

                <HorizView image_src={require('../../assets/images/playlistplaceholder.png')} caption='playlist3' />

            </ScrollView>
            <Text style={styles.subtitle}>Tracks</Text>
            <TrackContainerGen tracks={tracks} />
        </Container>

    );
};


export default AudioComponent;
