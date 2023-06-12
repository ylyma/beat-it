import React, { ReactElement, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageSourcePropType, Button, PermissionsAndroid } from 'react-native';
import TrackPlayer, { Capability, State, useTrackPlayerEvents, Event } from 'react-native-track-player';
import { useEffect } from 'react';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';
import HorizView from '../common/HorizView/HorizView';
import TrackButton from './TrackButton';
import TrackContainerGen from './TrackContainerGen';
import * as storageClasses from "react-native-scoped-storage";
// import * as jsmediatags from 'jsmediatags';



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



const AudioComponent: () => ReactElement = () => {
    // wrap this in a useEffect to make sure it only runs once and async
    // const [documentFolder, setDocumentFolder] = useState<storageClasses.FileType>();
    let documentFolder;
    // const [tracksObjects, setTracksObjects] = useState<any>([]);
    let tracksObjects;
    const [tracks, setTracks] = useState<any>([]);

    useEffect(() => {
        async function setup() {
            await TrackPlayer.setupPlayer().catch((error) => {
                console.log(error);
            });


            // move this to import button
            documentFolder = await storageClasses.openDocumentTree(true);

            console.log('document folder');
            console.log(documentFolder);
            console.log(documentFolder?.uri);

            tracksObjects = await storageClasses.listFiles(documentFolder!.uri);
            console.log('tracks objects');
            console.log(tracksObjects);

            for (let index = 0; index < tracksObjects.length; index++) {
                try {
                    const element = tracksObjects[index];
                    console.log('element');
                    console.log(element);
                    console.log("element.uri");
                    console.log(element.uri);

                    // new jsmediatags.Reader(element.uri)
                    //     .read({
                    //         onSuccess: (tag) => {
                    //             console.log('Success!');
                    //             console.log(tag);
                    //         },
                    //         onError: (error) => {
                    //             console.log('Error');
                    //             console.log(error);
                    //         }
                    // }
                    // );
                    console.log('tracks');
                    console.log(tracks);

                } catch (error) {
                    console.log(error);
                }

            }
        }



        setup().then(() => {
            console.log('setup complete');
            // console.log("tracks:" + tracks);

        });
    }, []);


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
            {/* <TrackContainerGen tracks={tracks} /> */}
        </Container>

    );
};


export default AudioComponent;
