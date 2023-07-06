import React, {ReactElement, useContext, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useEffect} from 'react';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';
import HorizView from '../common/HorizView/HorizView';
import Config from 'react-native-config';
import TrackContainer from './TrackContainer';
import DocumentPicker from 'react-native-document-picker';
import {AuthContext} from '../../context/providers/authProvider';
import {PLAYLIST} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/core';
import TrackButton from './TrackButton';

const AudioComponent: () => ReactElement = () => {
  // wrap this in a useEffect to make sure it only runs once and async
  // const [tracks, setTracks] = useState<any>([]);

  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;
  console.log(userId);
  const [upload, setUpload] = useState<boolean>(true);
  const {navigate} = useNavigation();
  // const [titles, setTitles] = useState();

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer().catch(error => {
        console.log(error);
      });
    }
    setup().then(() => {
      console.log('setup complete');
    });
  });

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: 'audio/mpeg',
        allowMultiSelection: true,
      });
      //let tee = [];
      for (let i = 0; i < response.length; i++) {
        console.log(response[i]);
        postAudio(response[i]);
        //tee.push(response[i].name);
      }
      //setTitles(tee);
      window.location.reload;
    } catch (err) {
      console.warn(err);
    }
  };

  const postAudio = async file => {
    let body = new FormData();
    body.append('file', file);

    fetch(`${Config.API_URL}/uploads/audio/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(res => {
        console.log('response' + JSON.stringify(res));
      })
      .catch(e => console.log(e));
  };

  // const importTracks = async () => {
  //   console.log('You can use the storage');
  //   documentFolder = await ScopedStorage.openDocumentTree(true);
  //   console.log(documentFolder);
  //   const tracksObjects = await ScopedStorage.listFiles(documentFolder.uri);
  //   console.log(tracksObjects);

  //   const allTracks: any[] = [];
  //   for (let i = 0; i < tracksObjects.length; i++) {
  //     if (
  //       tracksObjects[i].type === 'file' &&
  //       tracksObjects[i].mime.split('/')[0] === 'audio'
  //     ) {
  //       allTracks.push({
  //         url: tracksObjects[i].uri,
  //         title: tracksObjects[i].name.split('.')[0],
  //         artist: 'unknown',
  //       });
  //       const path = tracksObjects[i].uri;
  //       console.log('uri: ' + path);
  //       postAudio(path);
  //     }
  //   }
  //   setUpload(!upload);
  //   console.log(upload);
  // };

  return (
    <Container>
      <SearchBar
        icon={<Ionicons name="search" />}
        iconPosition="left"
        placeholder="Search"
      />
      <View style={styles.titleAndButton}>
        <Text style={styles.subtitle}>Playlists</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(PLAYLIST);
          }}>
          <Text style={styles.addButton}>New Playlist</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} horizontal>
        <HorizView
          image_src={require('../../assets/images/playlistplaceholder.png')}
          caption="playlist1"
        />

        <HorizView
          image_src={require('../../assets/images/playlistplaceholder.png')}
          caption="playlist2"
        />

        <HorizView
          image_src={require('../../assets/images/playlistplaceholder.png')}
          caption="playlist3"
        />
      </ScrollView>
      <View style={styles.titleAndButton}>
        <Text style={styles.subtitle}>Tracks</Text>
        <TouchableOpacity
          style={styles.refresh}
          onPress={() => {
            setUpload(!upload);
            console.log('u' + upload);
            console.log('hey');
          }}>
          <View>
            <Ionicons name={'refresh'} size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleDocumentSelection();
          }}>
          <Text style={styles.addButton}>Import Tracks</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.trackContainer}>
        <TrackContainer userId={userId} refresh={upload} />
      </View>

      {/* {titles.map(track => (
        <View key={track}>
          <TrackButton trackName={track} artist={''} userId={userId} />
        </View>
      ))} */}
    </Container>
  );
};

export default AudioComponent;
