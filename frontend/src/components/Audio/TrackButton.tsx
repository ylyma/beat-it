import {View, Text, TouchableOpacity} from 'react-native';
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

type TrackButtonProps = {
  trackName: string;
  // size: number
  artist: string;
  userId: string;
};

const TrackButton: (props: TrackButtonProps) => ReactElement = ({
  trackName,
  artist,
  userId,
}: TrackButtonProps) => {
  // const [currentTrack, setCurrentTrack] = React.useState("No Track Playing");
  // const [playing, setPlaying] = React.useState(true);
  // const [playIcon, setPlayIcon] = React.useState("play");
  const audioContext = React.useContext(AudioContext);

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

  const [url, setUrl] = useState<string>('');
  const getFile = async () => {
    try {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getaudio/${trackName}`,
        {
          method: 'GET',
        },
      ).then(res => res.text());
      console.log('getting file');
      setUrl(response);
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
        downloadAudio();
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

  // make this play immediately
  const playTrack = async () => {
    loadFile();
    await TrackPlayer.getCurrentTrack()
      .then(async trackId => {
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

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => playTrack()} onLongPress={addToQueue}>
        <View style={styles.buttonIcon}>
          <Ionicons name={'play'} size={20} />
        </View>
      </TouchableOpacity>
      <Text style={styles.songTitle}>{trackName}</Text>
    </View>
  );
};

export default TrackButton;
