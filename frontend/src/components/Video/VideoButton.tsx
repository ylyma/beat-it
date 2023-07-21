import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {Dispatch, ReactElement, useContext, useState} from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS, {DownloadFileOptions, downloadFile} from 'react-native-fs';
import shorthash from 'shorthash';
import Config from 'react-native-config';
import {VideoContext} from '../../context/providers/videoProvider';
import * as ScopedStorage from 'react-native-scoped-storage';
import {VIDEOPLAYBACK} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/core';
import colors from '../../assets/themes/colors';

type VideoButtonProps = {
  videoName: string;
  userId: string;
  reload: () => void;
};
const VideoButton: (props: VideoButtonProps) => ReactElement = ({
  videoName,
  userId,
  reload,
}: VideoButtonProps) => {
  const videoContext = useContext(VideoContext);
  const navigation = useNavigation();
  const name = shorthash.unique(videoName.split('.')[0]);
  const extension = 'file:/';
  const fileType = videoName.split('.')[1];
  //cache directory path: /data/user/0/com.beatit/cache
  const folderPath = extension + RNFS.CachesDirectoryPath + '/video/';
  const filePath = folderPath + name + '.' + fileType;
  const videoPath =
    RNFS.CachesDirectoryPath + '/video/' + name + '.' + fileType;

  const makeDir = () => {
    RNFS.mkdir(folderPath);
    console.log('folder created');
  };

  const [url, setUrl] = useState<string>('');
  const getFile = async () => {
    try {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getvideo/${videoName}`,
        {
          method: 'GET',
        },
      ).then(res => res.text());
      console.log(response);
      setUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadVideo = async (): Promise<any> => {
    try {
      const options: DownloadFileOptions = {
        fromUrl: url,
        toFile: filePath,
      };
      const response = await downloadFile(options);
      return response.promise
        .then(async res => {
          if (res && res.statusCode === 200 && res.bytesWritten > 0) {
            console.log('ok!');
          } else {
            console.log('booo');
            console.log(res.statusCode);
          }
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const listFiles = async () => {
    try {
      const reader = await RNFS.readDir(folderPath);
      console.log('folder: ' + folderPath);
      for (let i = 0; i < reader.length; i++) {
        const item = reader[i];

        console.log('files:' + i + '_' + item.name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadFile = async () => {
    RNFS.exists(folderPath).then(exists => {
      if (!exists) {
        console.log('making folder');
        makeDir();
      }
      console.log('folder exists');
    });
    RNFS.exists(filePath).then(exists => {
      if (exists) {
        RNFS.stat(filePath).then(file => console.log(file.mtime));
        const current = new Date();
        RNFS.touch(filePath, current);
        RNFS.stat(filePath).then(file => console.log(file.mtime));
        listFiles();
      } else {
        console.log('file doesnt exist');
        getFile();
        downloadVideo();
        listFiles();
      }
    });
  };

  const playVideo = async () => {
    await loadFile();
    // const videoObject = await ScopedStorage.listFiles(videoPath);
    const video = {
      uri: videoPath,
      name: videoName,
    };
    videoContext.dispatch({type: 'SET_VIDEO', payload: video});
    navigation.navigate(VIDEOPLAYBACK);
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Deleting video', `Proceed to delete video: ${videoName}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteVideo();
          reload();
        },
      },
    ]);

  const deleteVideo = async () => {
    await fetch(
      `${Config.API_URL}/uploads/${userId}/deletevideo/${videoName}`,
      {
        method: 'DELETE',
      },
    ).catch(error => console.log(error));
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => playVideo()}>
        <View style={styles.buttonIcon}>
          <Ionicons name={'play'} size={20} />
        </View>
      </TouchableOpacity>
      <Text style={styles.videoTitle}>{videoName}</Text>
      <View style={styles.delete}>
        <TouchableOpacity
          onPress={() => {
            createTwoButtonAlert();
          }}>
          <Ionicons name={'trash-bin'} size={15} color={colors.failure} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoButton;
