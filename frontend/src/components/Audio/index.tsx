import React, { ReactElement, useContext, useState } from 'react';
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
import * as ScopedStorage from "react-native-scoped-storage";
import Config from 'react-native-config';
import { AuthContext } from '../../context/providers/authProvider';

const AudioComponent: () => ReactElement = () => {
    // wrap this in a useEffect to make sure it only runs once and async
    // const [documentFolder, setDocumentFolder] = useState<storageClasses.FileType>();
    let documentFolder;
    // const [tracksObjects, setTracksObjects] = useState<any>([]);
    let tracksObjects;
    const authContext = useContext(AuthContext);
    const [tracks, setTracks] = useState<any>([]);

    useEffect(() => {
        async function setup() {
            await TrackPlayer.setupPlayer().catch((error) => {
                console.log(error);
            });
        }
        setup().then(() => {
            console.log('setup complete');

        });
    }, []);

    const importTracks = async () => {
        console.log('You can use the storage');
        documentFolder = await ScopedStorage.openDocumentTree(true);
        console.log(documentFolder);
        const tracksObjects = await ScopedStorage.listFiles(documentFolder.uri);
        console.log(tracksObjects);

        const allTracks = tracksObjects.map((track: any) => {
            return {
                url: track.uri,
                title: track.name.split('.')[0],
                artist: 'unknown',
            };
        });
        // console.log(tracksObjects);
        setTracks(allTracks);

    };

    return (
        <Container>
            <SearchBar
                icon={<Ionicons name="search" />}
                iconPosition="left"
                placeholder="Search"
            />
            <View style={styles.titleAndButton}>
                <Text style={styles.subtitle}>Playlists</Text>
                <TouchableOpacity onPress={() => { }} >
                    <Text style={styles.addButton}>New Playlist</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll} horizontal>

                <HorizView image_src={require('../../assets/images/playlistplaceholder.png')} caption='playlist1' />

                <HorizView image_src={require('../../assets/images/playlistplaceholder.png')} caption='playlist2' />

                <HorizView image_src={require('../../assets/images/playlistplaceholder.png')} caption='playlist3' />

            </ScrollView>
            <View style={styles.titleAndButton}>
                <Text style={styles.subtitle}>Tracks</Text>
                <TouchableOpacity onPress={importTracks} >
                    <Text style={styles.addButton}>Import Tracks</Text>
                </TouchableOpacity>
            </View>
            <TrackContainerGen tracks={tracks} />
        </Container>

    );
};


export default AudioComponent;