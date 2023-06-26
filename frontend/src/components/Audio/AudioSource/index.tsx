import React, {ReactElement, useEffect, useState} from 'react';
import {View, Image, Platform, TouchableOpacity} from 'react-native';
import shorthash from 'shorthash';
import RNFS, {DownloadFileOptions, downloadFile} from 'react-native-fs';
import Video from 'react-native-video';
import axios from 'axios';
import Config from 'react-native-config';

type Props = {userId: string; title: string; fileType: string};

const AudioSource: (props: Props) => ReactElement = ({
  userId,
  title,
  fileType,
}: Props) => {
  const [fileData, setFileData] = useState<any>();
  //const [playing, setPlaying] = useState<boolean>();

  const name = shorthash.unique(title);
  const extension = 'file://';
  //cache directory path: /data/user/0/com.beatit/cache
  const folderPath = extension + RNFS.CachesDirectoryPath;
  const filePath = folderPath + '/' + name + '.' + fileType;
  console.log(filePath);

  const makeDir = folderPath => {
    RNFS.mkdir(folderPath);
    console.log('folder created');
  };

  const loadFile = async filePath => {
    const response = await RNFS.readFile(filePath);
    setFileData(response);
  };

  const validateResponse = response => {
    if (!response.ok) {
      console.log('not ok');
      throw Error(response.statusText);
    }
    if (response == null) {
      console.log('empty');
      return response;
    }
    console.log('response ok');
    return response;
  };

  const saveFile = async (userId: string, title: string, filePath: string) => {
    const response = await fetch(
      'http://10.0.2.2:3000/' + userId + '/getvideo/' + title + '.' + fileType,
    );
    if (!response.ok) {
      console.log('not ok');
      throw Error(response.statusText);
    }
    console.log('response ok');
    // RNFS.writeFile(filePath);
    return response;
  };

  const downloadVideo = async (userId, title, fileType): Promise<any> => {
    const options: DownloadFileOptions = {
      fromUrl: 'http://10.0.2.2:3000/9/getvideo/imagetest.jpg',
      toFile: filePath,
    };
    const response = await downloadFile(options);
    return response.promise.then(async res => {
      if (res && res.statusCode == 200 && res.bytesWritten > 0) {
        console.log('ok!');
      } else {
        console.log('booo');
        console.log(res.statusCode);
      }
    });
  };

  const listFiles = async folderPath => {
    const reader = await RNFS.readDir(folderPath);
    for (let i = 0; i < reader.length; i++) {
      const item = reader[i];
      console.log('folder: ' + folderPath);
      console.log('files:' + i + '_' + item.name);
    }
  };

  useEffect(() => {
    RNFS.exists(folderPath).then(exists => {
      if (!exists) {
        makeDir(folderPath);
      }
    });
    RNFS.exists(filePath).then(exists => {
      if (exists) {
        loadFile(filePath);
      } else {
        //downloadVideo(userId, title, filePath);
        saveFile(userId, title, filePath);
        listFiles(folderPath);
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
      {/* <Video
        source={fileData}
        style={{width: 800, height: 800}}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        volume={1.0}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      /> */}
      <Image source={fileData} />
    </View>
  );
};

export default AudioSource;
