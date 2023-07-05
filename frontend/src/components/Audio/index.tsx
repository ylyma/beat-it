import React, {ReactElement, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  Button,
  PermissionsAndroid,
} from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {useEffect} from 'react';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';
import HorizView from '../common/HorizView/HorizView';
import Config from 'react-native-config';
import TrackContainer from './TrackContainer';
import {useCallback} from 'react';
import DocumentPicker, {types} from 'react-native-document-picker';

const AudioComponent: () => ReactElement = () => {
  // wrap this in a useEffect to make sure it only runs once and async
  // //const [tracks, setTracks] = useState<any>([]);
  let documentFolder;
  const userId = '7';
  const [upload, setUpload] = useState<boolean>(true);
  const [fileResponse, setFileResponse] = useState([]);

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

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: 'audio/mpeg',
        allowMultiSelection: true,
      });
      setFileResponse(response);
      for (let i = 0; i < fileResponse.length; i++) {
        console.log(fileResponse[i]);
        postAudio(fileResponse[i]);
      }
      const refresh = !upload;
      setUpload(refresh);
      console.log('upload status: ' + upload);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const postAudio = async (file: File) => {
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
        <TouchableOpacity onPress={() => {}}>
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
          onPress={() => {
            handleDocumentSelection();
          }}>
          <Text style={styles.addButton}>Import Tracks</Text>
        </TouchableOpacity>
      </View>
      <TrackContainer userId={userId} refresh={upload} />
    </Container>
  );
};

export default AudioComponent;
