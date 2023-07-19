import React, {ReactElement, useContext, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useEffect} from 'react';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';
import HorizView from '../common/HorizView/HorizView';
import Config from 'react-native-config';
import TrackContainer from './TrackContainer';
import DocumentPicker, {types} from 'react-native-document-picker';
import {AuthContext} from '../../context/providers/authProvider';
import {PLAYLIST} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/core';
import Modal from '../common/Modal';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import PlaylistContainer from '../Playlist/PlaylistContainer';

const AudioComponent: () => ReactElement = () => {
  // wrap this in a useEffect to make sure it only runs once and async
  // const [tracks, setTracks] = useState<any>([]);

  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;
  console.log(userId);
  const [upload, setUpload] = useState<boolean>(true);
  const [uploadTop, setUploadTop] = useState<boolean>(true);
  const [playlistTitle, setPlaylistTitle] = useState<string>('');
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
        type: [types.audio],
        allowMultiSelection: true,
      });
      //let tee = [];
      for (let i = 0; i < response.length; i++) {
        console.log(response[i]);
        postAudio(response[i]);
        //tee.push(response[i].name);
      }
      //setTitles(tee);
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

  //TODO: getallplaylists & display
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

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
          style={styles.playlistRefresh}
          onPress={() => {
            setUploadTop(!uploadTop);
          }}>
          <View>
            <Ionicons name={'refresh'} size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleModal();
          }}>
          <Text style={styles.addButton}>New Playlist</Text>
        </TouchableOpacity>
      </View>
      <PlaylistContainer refresh={uploadTop}></PlaylistContainer>
      <View style={styles.titleAndButton}>
        <Text style={styles.subtitle}>Tracks</Text>
        <TouchableOpacity
          style={styles.refresh}
          onPress={() => {
            setUpload(!upload);
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

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
        </View>
      </Modal>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Create New Playlist" />
          <Modal.Body>
            <Text style={styles.modalText}>Enter Playlist name</Text>
            <Input
              placeholder={'Playlist name'}
              onChangeText={(text: string) => setPlaylistTitle(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <CustomButton
              style={styles.modalButton}
              title="Confirm"
              primary
              onPress={() => navigate(PLAYLIST, {playlistTitle: playlistTitle})}
            />
            <CustomButton
              style={styles.modalButton}
              title="Cancel"
              failure
              onPress={() => handleModal()}
            />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </Container>
  );
};

export default AudioComponent;
