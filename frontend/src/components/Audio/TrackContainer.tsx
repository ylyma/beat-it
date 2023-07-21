import {View} from 'react-native';
import React, {ReactElement, useEffect, useState} from 'react';
import TrackButton from './TrackButton';
import Config from 'react-native-config';
import RNFS from 'react-native-fs';

type Props = {
  userId: string;
  refresh: boolean;
  reload: () => void;
  search: string;
};

const TrackContainer: (props: Props) => ReactElement = ({
  userId,
  refresh,
  reload,
  search,
}: Props) => {
  const extension = 'file:/';
  const folderPath = extension + RNFS.CachesDirectoryPath + '/audio/';
  const [tracks, setTracks] = useState<string[]>(['']);
  const deleteFile = async (f: string) => {
    try {
      await RNFS.unlink(f);
      console.log('file deleted');
    } catch (error) {
      console.log(error);
    }
  };

  const sortFiles = async () => {
    try {
      const reader = await RNFS.readDir(folderPath);
      return reader
        .map(fileName => ({
          name: fileName,
          time: fileName.mtime === undefined ? new Date(0) : fileName.mtime,
        }))
        .sort((a, b) => a.time.getTime() - b.time.getTime())
        .map(file => file.name);
    } catch (error) {
      console.log(error);
    }
  };
  const lruCacheEviction = async () => {
    const reader = await sortFiles();
    if (reader !== undefined) {
      for (let i = 0; i < reader.length; i++) {
        const item = reader[i];

        console.log('files:' + i + '_' + item.name);
      }
      if (reader.length > 20) {
        const oldestFilePath = folderPath + reader[0];
        deleteFile(oldestFilePath);
        console.log(reader[0]);
      }
    }
  };

  useEffect(() => {
    const getAllAudio = async () => {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getaudio`,
        {
          method: 'GET',
        },
      )
        .then(res => res.text())
        .then(r => {
          console.log(r);
          let titles = r.split('/');
          for (let i = 0; i < titles.length; i++) {
            titles[i] = titles[i].replace(`#audio_${userId}_`, '');
          }
          console.log('hi ' + titles);
          setTracks(titles);
        });
    };
    getAllAudio();
  }, [refresh, userId]);

  console.log(tracks.length);
  console.log('title' + tracks[0]);
  lruCacheEviction().then(() => console.log('cache eviction'));
  return (
    <View>
      {tracks[0] !== '' ? (
        tracks.map(track =>
          search == undefined ? (
            <View key={track}>
              <TrackButton
                trackName={track}
                artist={''}
                userId={userId}
                reload={reload}
              />
            </View>
          ) : track.toLowerCase().includes(search) ? (
            <View key={track}>
              <TrackButton
                trackName={track}
                artist={''}
                userId={userId}
                reload={reload}
              />
            </View>
          ) : (
            <View></View>
          ),
        )
      ) : (
        <View />
      )}
    </View>
  );
};

export default TrackContainer;
