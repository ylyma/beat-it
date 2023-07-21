import {View} from 'react-native';
import React, {ReactElement, useContext, useEffect, useState} from 'react';
import Config from 'react-native-config';
import RNFS from 'react-native-fs';
import VideoButton from './VideoButton';
import {VideoContext} from '../../context/providers/videoProvider';
import shorthash from 'shorthash';

type Props = {userId: string; refresh: boolean; reload: () => void};

const VideosContainer: (props: Props) => ReactElement = ({
  userId,
  refresh,
  reload,
}: Props) => {
  const extension = 'file:/';
  const folderPath = extension + RNFS.CachesDirectoryPath + '/video/';
  const [videos, setVideos] = useState<string[]>(['']);

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
      if (reader.length > 10) {
        const oldestFilePath = folderPath + reader[0].name;
        deleteFile(oldestFilePath);
        console.log(reader[0].name);
      }
    }
  };

  useEffect(() => {
    const getAllVideo = async () => {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getvideo`,
        {
          method: 'GET',
        },
      )
        .then(res => res.text())
        .then(r => {
          console.log(r);
          let titles = r.split('/');
          for (let i = 0; i < titles.length; i++) {
            titles[i] = titles[i].replace(`#video_${userId}_`, '');
          }
          console.log('hi ' + titles);
          setVideos(titles);
        });
    };
    getAllVideo();
    lruCacheEviction().then(() => console.log('cache eviction'));
  }, [refresh, userId]);

  console.log(videos[0]);

  return (
    <View>
      {videos[0] !== '' ? (
        videos.map(video => (
          <View key={video}>
            <VideoButton videoName={video} userId={userId} reload={reload} />
          </View>
        ))
      ) : (
        <View />
      )}
    </View>
  );
};

export default VideosContainer;
