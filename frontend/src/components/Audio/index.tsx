import React, { ReactElement, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageSourcePropType } from 'react-native';
import TrackPlayer, { Capability, State } from 'react-native-track-player';
import { useEffect } from 'react';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';
import HorizView from '../common/HorizView/HorizView';
import TrackButton from './TrackButton';
import MiniPlayer from '../common/MiniPlayer/MiniPlayer';

// TrackPlayer.updateOptions({
//     capabilities: [Capability.Play, Capability.Pause],
//     compactCapabilities: [Capability.Play, Capability.Pause],
// });

//TODO: add bottom bar with play/pause button and track info

const tracks = [
    {
        id: '1',
        url: require('../../test_data/audio/yeeling_item.mp3'),
        title: 'Track 1',
        artist: 'Artist 1',
    },
];


const AudioComponent: () => ReactElement = () => {
    const [playing, setPlaying] = useState<boolean>(false);

    // wrap this in a useEffect to make sure it only runs once and async
    useEffect(() => {
        async function setup() {
            await TrackPlayer.setupPlayer().catch((error) => {
                console.log(1);
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


    const playPause = () => {
        if (playing) {
            setPlaying(false);
            TrackPlayer.pause();
        } else {
            setPlaying(true);
            TrackPlayer.play();
        }
    };

    const setPlayIcon = () => {
        if (playing) {
            return 'pause';
        } else {
            return 'play';
        }
    };

    // make a loading screen that is returned before trackplayer is setup
    // while (!playerLoaded) {
    //     return <Text>Loading...</Text>;
    // }

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
            <ScrollView style={styles.scroll} horizontal>
                <View style={styles.tracks}>
                    <TrackButton playPause={playPause} setPlayIcon={setPlayIcon} size={20} trackName='audio1' trackSource={require('../../test_data/audio/yeeling_item.mp3')} artist='yeeling' />
                    <TrackButton playPause={playPause} setPlayIcon={setPlayIcon} size={20} trackName='audio2' trackSource='' artist='' />
                </View>

                <View style={styles.tracks}>
                    <TrackButton playPause={playPause} setPlayIcon={setPlayIcon} size={20} trackName='audio3' trackSource='' artist='' />
                    <TrackButton playPause={playPause} setPlayIcon={setPlayIcon} size={20} trackName='audio4' trackSource='' artist='' />
                </View>
                <View style={styles.tracks}>
                    <TrackButton playPause={playPause} setPlayIcon={setPlayIcon} size={20} trackName='audio5' trackSource='' artist='' />
                    <TrackButton playPause={playPause} setPlayIcon={setPlayIcon} size={20} trackName='audio6' trackSource='' artist='' />
                </View>
            </ScrollView>
            <MiniPlayer onPress={playPause} />
        </Container>
    );
};


export default AudioComponent;
