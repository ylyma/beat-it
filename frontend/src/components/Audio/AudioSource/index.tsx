import React, {ReactElement, useEffect, useState} from 'react';
import {View, Image, Platform, TouchableOpacity} from 'react-native';
import shorthash from 'shorthash';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = {userId: string; title: string; fileType: string};

const AudioSource: (props: Props) => ReactElement = ({
  userId,
  title,
  fileType,
}: Props) => {
  const [fileData, setFileData] = useState<any>();
  const [playing, setPlaying] = useState<boolean>();

  const name = shorthash.unique(title);
  const extension = 'file://';
  const filePath =
    extension + RNFS.CachesDirectoryPath + '/' + name + '.' + fileType;

  const loadFile = async filePath => {
    const response = await RNFS.readFile(filePath);
    setFileData(response);
  };

  const validateResponse = response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  const saveFile = (userId, title, filePath) => {
    fetch('http://localhost:3000/' + userId + '/getaudio/' + title)
      .then(validateResponse)
      .then(response => RNFS.writeFile(filePath, response.body));
  };

  useEffect(() => {
    RNFS.exists(filePath).then(exists => {
      if (exists) {
        loadFile(filePath);
      } else {
        saveFile(userId, title, filePath);
      }
    });
  });

  // useEffect(() => {
  //   loadFile(filePath).setVolume(1);
  //   return () => {
  //     audio.release();
  //   };
  // }, [audio]);
  // const playPause = () => {
  //   if (fileData.isPlaying()) {
  //     fileData.pause();
  //     setPlaying(false);
  //   } else {
  //     setPlaying(true);
  //     fileData.play(success => {
  //       if (success) {
  //         setPlaying(false);
  //         console.log('successfully finished playing');
  //       } else {
  //         setPlaying(false);
  //         console.log('playback failed due to audio decoding errors');
  //       }
  //     });
  //   }
  // };
  return (
    // <View style={styles.container}>
    //   <TouchableOpacity style={styles.playBtn} onPress={playPause}>
    //     <Ionicons
    //       name={playing ? 'ios-pause-outline' : 'ios-play-outline'}
    //       size={36}
    //       color={'#fff'}
    //     />
    //   </TouchableOpacity>
    // </View>
    <View>
      <Video
        source={fileData}
        style={{width: 800, height: 800}}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        volume={1.0}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
    </View>
  );
};

export default AudioSource;