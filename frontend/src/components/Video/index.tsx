import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Video from 'react-native-video';
import styles from './styles';
import * as ScopedStorage from 'react-native-scoped-storage';
import globalStyles from '../../globalStyles/globalStyles';
import VideoPlayer from 'react-native-video-controls';
import VideoButtonGenerator from './VideoButtonGenerator';
import {useNavigation} from '@react-navigation/core';
import {VIDEOPLAYBACK} from '../../constants/routeNames';
import {VideoContext} from '../../context/providers/videoProvider';
import DocumentPicker, {types} from 'react-native-document-picker';
import {AuthContext} from '../../context/providers/authProvider';
import Config from 'react-native-config';
import VideosContainer from './VideosContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VideoComponent = () => {
  // const [video, setVideo] = React.useState<any>(null);
  //const [allVideos, setAllVideos] = useState<any>([]);
  const videoContext = useContext(VideoContext);
  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;
  const [upload, setUpload] = useState<boolean>(true);
  console.log(userId);

  // const importVideos = async () => {
  //   console.log('You can use the storage');
  //   documentFolder = await ScopedStorage.openDocumentTree(true);
  //   console.log(documentFolder);
  //   const videoObjects = await ScopedStorage.listFiles(documentFolder.uri);
  //   console.log(videoObjects);

  //   let tempVideos: any[] = [];
  //   for (let i = 0; i < videoObjects.length; i++) {
  //     if (
  //       videoObjects[i].type === 'file' &&
  //       videoObjects[i].mime.split('/')[0] === 'video'
  //     ) {
  //       tempVideos.push(videoObjects[i]);
  //     } else {
  //       continue;
  //     }
  //   }
  //   setAllVideos(tempVideos);
  //   console.log(allVideos);
  // };
  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.video],
        allowMultiSelection: true,
      });
      //let tee = [];
      for (let i = 0; i < response.length; i++) {
        console.log(response[i]);
        postVideo(response[i]);
        //tee.push(response[i].name);
      }
      //setTitles(tee);
    } catch (err) {
      console.warn(err);
    }
  };
  const postVideo = async file => {
    let body = new FormData();
    body.append('file', file);

    fetch(`${Config.API_URL}/uploads/video/${userId}`, {
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

  // const handlePress = vid => {
  //   videoContext.dispatch({type: 'SET_VIDEO', payload: vid});
  //   navigation.navigate(VIDEOPLAYBACK);
  // };

  return (
    <View>
      <View style={styles.titleAndButton}>
        <Text style={styles.subtitle}>Video</Text>
        <TouchableOpacity
          style={styles.refresh}
          onPress={() => {
            setUpload(!upload);
          }}>
          <View>
            <Ionicons name={'refresh'} size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDocumentSelection()}>
          <Text style={styles.addButton}>Import Videos</Text>
        </TouchableOpacity>
      </View>
      <VideosContainer userId={userId} refresh={false} />
    </View>
  );
};

export default VideoComponent;
