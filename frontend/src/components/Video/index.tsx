import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import * as ScopedStorage from 'react-native-scoped-storage';
import globalStyles from '../../globalStyles/globalStyles';
import VideoPlayer from 'react-native-video-controls';
import VideoButtonGenerator from './VideoButtonGenerator';
import {useNavigation} from '@react-navigation/core';
import {VIDEOEDIT} from '../../constants/routeNames';

const VideoComponent = () => {
  const [video, setVideo] = React.useState<any>(null);
  let documentFolder;
  let videoPlayer = React.useRef(null);
  const [allVideos, setAllVideos] = React.useState<any>([]);
  const navigation = useNavigation();

  const importVideos = async () => {
    console.log('You can use the storage');
    documentFolder = await ScopedStorage.openDocumentTree(true);
    console.log(documentFolder);
    const videoObjects = await ScopedStorage.listFiles(documentFolder.uri);
    console.log(videoObjects);

    let tempVideos: any[] = [];
    for (let i = 0; i < videoObjects.length; i++) {
      if (
        videoObjects[i].type === 'file' &&
        videoObjects[i].mime.split('/')[0] === 'video'
      ) {
        tempVideos.push(videoObjects[i]);
      } else {
        continue;
      }
    }
    setAllVideos(tempVideos);
    console.log(allVideos);
  };

  if (video === null) {
    return (
      <View>
        <View style={styles.titleAndButton}>
          <Text style={styles.subtitle}>Video</Text>
          <TouchableOpacity onPress={importVideos}>
            <Text style={styles.addButton}>Import Videos</Text>
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.subtitle}>{video?.name}</Text>
        <VideoButtonGenerator video={allVideos} action={setVideo} />
      </View>
    );
  }
  return (
    <View>
      <View>
        <VideoPlayer
          ref={(ref: any) => {
            videoPlayer = ref;
          }}
          source={video}
          style={styles.videoPlayer}
          controls={false}
          paused={false}
          onError={err => console.log(err)}
        />
      </View>
      <View style={styles.titleAndButton}>
        <Text style={globalStyles.subtitle}>{video?.name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(VIDEOEDIT, {video: video})}>
          <Text style={styles.addButton}>Edit Video</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleAndButton}>
        <Text style={styles.subtitle}>Video</Text>
        <TouchableOpacity onPress={importVideos}>
          <Text style={styles.addButton}>Import Videos</Text>
        </TouchableOpacity>
      </View>
      <VideoButtonGenerator video={allVideos} action={setVideo} />
    </View>
  );
};

export default VideoComponent;
