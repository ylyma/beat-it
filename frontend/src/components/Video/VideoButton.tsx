import {View, Text, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
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
import {useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeTabParamList} from '../../navigations/HomeTab';

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
  const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
  const name = shorthash.unique(videoName.split('.')[0]);
  const extension = 'file:/';
  const fileType = videoName.split('.')[1];
  //cache directory path: /data/user/0/com.beatit/cache
  const folderPath = extension + RNFS.CachesDirectoryPath + '/video/';
  const filePath = folderPath + name + '.' + fileType;
  // const videoPath =
  //   RNFS.CachesDirectoryPath + '/video/' + name + '.' + fileType;
  const colors = useTheme().colors;

  const makeDir = () => {
    RNFS.mkdir(folderPath);
    console.log('folder created');
  };

  //const [url, setUrl] = useState<string>('');
  const getFile = async () => {
    try {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getvideo/${videoName}`,
        {
          method: 'GET',
        },
      ).then(res => res.text());

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const downloadVideo = async (response: any): Promise<any> => {
    try {
      const options: DownloadFileOptions = {
        fromUrl: response,
        toFile: filePath,
      };
      //   const response = await downloadFile(options);
      //   return response.promise
      //     .then(async res => {
      //       if (res && res.statusCode === 200 && res.bytesWritten > 0) {
      //         console.log('ok!');
      //       } else {
      //         console.log('booo');
      //         console.log(res.statusCode);
      //       }
      //     })
      //     .catch(error => console.log(error));
      console.log(filePath);
      await downloadFile(options);
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
  const loadFile = () => {
    const videoPath =
      RNFS.CachesDirectoryPath + '/video/' + name + '.' + fileType;

    RNFS.exists(folderPath).then(async exists => {
      if (!exists) {
        console.log('making folder');
        makeDir();
      }
      console.log('folder exists');
      return videoPath;
    });
    RNFS.exists(filePath).then(async exists => {
      if (exists) {
        RNFS.stat(filePath).then(file => console.log(file.mtime));
        const current = new Date();
        RNFS.touch(filePath, current);
        //RNFS.stat(filePath).then(file => console.log(file.mtime));
        listFiles();
        return videoPath;
      } else {
        console.log('file doesnt exist');
        const url = await getFile();
        console.log('1' + url);
        await downloadVideo(url);
        console.log('2');
        listFiles();
        console.log('im donee');
        return videoPath;
      }
    });
    return videoPath;
  };

  const playVideo = () => {
    const vidPath = loadFile();
    const video = {
      uri: vidPath,
      name: videoName,
    };
    videoContext.dispatch({type: 'SET_VIDEO', payload: video});
    console.log('loaded');
    console.log(vidPath);

    // const videoObject = await ScopedStorage.listFiles(videoPath);
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

  const wait = () => navigation.navigate(VIDEOPLAYBACK);
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          playVideo();
          setTimeout(wait, 1500);
          ToastAndroid.show('Video is loading', ToastAndroid.SHORT);
        }}>
        <View style={[styles.buttonIcon, {backgroundColor: colors.fourth}]}>
          <Ionicons name={'play'} size={20} color={colors.alwayswhite} />
        </View>
      </TouchableOpacity>
      <Text style={[styles.videoTitle, {color: colors.text}]}>{videoName}</Text>
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
