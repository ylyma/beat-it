import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {ReactElement, useEffect, useState} from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import {AudioContext} from '../../context/providers/audioProvider';
import RNFS, {DownloadFileOptions, downloadFile} from 'react-native-fs';
import shorthash from 'shorthash';
import Config from 'react-native-config';
import {useTheme} from '@react-navigation/native';

type TrackButtonProps = {
  trackName: string;
  // size: number
  artist: string;
  userId: string;
  reload: () => void;
};

const TrackButton: (props: TrackButtonProps) => ReactElement = ({
  trackName,
  artist,
  userId,
  reload,
}: TrackButtonProps) => {
  // const [currentTrack, setCurrentTrack] = React.useState("No Track Playing");
  // const [playing, setPlaying] = React.useState(true);
  // const [playIcon, setPlayIcon] = React.useState("play");
  const audioContext = React.useContext(AudioContext);
  const colors = useTheme().colors;

  const name = shorthash.unique(trackName.split('.')[0]);
  const extension = 'file:/';
  const fileType = trackName.split('.')[1];
  //cache directory path: /data/user/0/com.beatit/cache
  const folderPath = extension + RNFS.CachesDirectoryPath + '/audio/';
  const filePath = folderPath + name + '.' + fileType;
  const trackPath =
    RNFS.CachesDirectoryPath + '/audio/' + name + '.' + fileType;

  const makeDir = () => {
    RNFS.mkdir(folderPath);
    console.log('folder created');
  };

  //const [url, setUrl] = useState<string>('');
  const getFile = async () => {
    try {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getaudio/${trackName}`,
        {
          method: 'GET',
        },
      ).then(res => res.text());
      console.log('getting file');
      //setUrl(response);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const downloadAudio = async (url): Promise<any> => {
    try {
      const options: DownloadFileOptions = {
        fromUrl: url,
        toFile: filePath,
      };
      console.log('downloading');
      console.log(url);
      await downloadFile(options);
      // return response.promise
      //   .then(async res => {
      //     if (res && res.statusCode === 200 && res.bytesWritten > 0) {
      //       console.log('ok!');
      //     } else {
      //       console.log('booo');
      //       console.log(res.statusCode);
      //     }
      //   })
      //   .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };


  const downloadAudio = async (): Promise<any> => {
    try {
      const options: DownloadFileOptions = {
        fromUrl: url,
        toFile: filePath,
      };
      console.log('downloading');
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
  const loadFile = () => {
    RNFS.exists(folderPath).then(exists => {
      if (!exists) {
        console.log('making folder');
        makeDir();
      }
      console.log('folder exists');
    });
    RNFS.exists(filePath).then(async exists => {
      if (exists) {
        RNFS.stat(filePath).then(file => console.log(file.mtime));
        const current = new Date();
        RNFS.touch(filePath, current);
        RNFS.stat(filePath).then(file => console.log(file.mtime));
        listFiles();
      } else {
        console.log('file doesnt exist');
        const url = await getFile();
        await downloadAudio(url);
        listFiles();
      }
    });
  };
  const addToQueue = () => {
    console.log(audioContext.noTrack);
    console.log('hi');
    TrackPlayer.add({
      title: trackName,
      url: trackPath,
      artist: artist,
    }).then(() =>
      audioContext.playing ? TrackPlayer.play() : TrackPlayer.pause(),
    );
  };

  const playTrack = async () => {
    await TrackPlayer.getCurrentTrack()
      .then(async (trackId: any) => {
        console.log('t' + trackId);
        let queueLength;
        await TrackPlayer.getQueue().then(queue => {
          queueLength = queue.length;
          console.log('q' + queueLength);
        });
        if (queueLength === 0) {
          console.log('adding first track');
          TrackPlayer.add({
            title: trackName,
            url: trackPath,
            artist: artist,
          }).then(() => TrackPlayer.play());
        } else {
          trackId = trackId + 1;
          TrackPlayer.add(
            {
              title: trackName,
              url: trackPath,
              artist: artist,
            },
            trackId,
          ).then(() => TrackPlayer.skipToNext().then(() => TrackPlayer.play()));
        }
      })
      .catch(error => {
        console.log(error);
      });
    TrackPlayer.getQueue().then(queue => {
      console.log(queue);
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Deleting track', `Proceed to delete track: ${trackName}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteTrack();
          reload();
        },
      },
    ]);

  const deleteTrack = async () => {
    await fetch(
      `${Config.API_URL}/uploads/${userId}/deleteaudio/${trackName}`,
      {
        method: 'DELETE',
      },
    ).catch(error => console.log(error));
    
  const pauseTrack = async () => {
    await TrackPlayer.pause();
  };

  return (
    <View style={styles.buttonContainer}>
      {audioContext.playing && audioContext.currentTrack === trackName ? (
        <TouchableOpacity
          onPress={() => {
            pauseTrack();
          }}>
          <View style={[styles.buttonIcon, {backgroundColor: colors.fourth}]}>
            <Ionicons name={'pause'} size={20} color={colors.lightfourth} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            loadFile();
            playTrack();
          }}
          onLongPress={addToQueue}>
          <View style={[styles.buttonIcon, {backgroundColor: colors.fourth}]}>
            <Ionicons name={'play'} size={20} color={colors.lightfourth} />
          </View>
        </TouchableOpacity>
      )}
      <Text style={styles.songTitle}>{trackName}</Text>
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

export default TrackButton;
