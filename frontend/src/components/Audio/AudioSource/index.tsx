import React, {ReactElement, useEffect, useState} from 'react';
import {View} from 'react-native';
import shorthash from 'shorthash';
import RNFS, {DownloadFileOptions, downloadFile} from 'react-native-fs';
import Config from 'react-native-config';
import TrackButton from '../TrackButton';

type Props = {userId: string; title: string};

const AudioSource: (props: Props) => ReactElement = ({
  userId,
  title,
}: Props) => {
  const name = shorthash.unique(title.split('.')[0]);
  const extension = 'file:/';
  const fileType = title.split('.')[1];
  //cache directory path: /data/user/0/com.beatit/cache
  const folderPath = extension + RNFS.CachesDirectoryPath + '/audio/';
  const filePath = folderPath + name + '.' + fileType;
  const trackPath =
    RNFS.CachesDirectoryPath + '/audio/' + name + '.' + fileType;
  console.log(filePath);

  const makeDir = () => {
    RNFS.mkdir(folderPath);
    console.log('folder created');
  };

  // const loadFile = async () => {
  //   try {
  //     console.log('here');
  //     const file = await RNFS.readFile(
  //       `${RNFS.CachesDirectoryPath}/${name}.${fileType}`,
  //       'base64',
  //     );
  //     setFileData(file);
  //     console.log(fileData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [url, setUrl] = useState<string>('');
  const getFile = async () => {
    try {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getaudio/${title}`,
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

  const deleteFile = async (f: string) => {
    try {
      await RNFS.unlink(f);
      console.log('file deleted');
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
        const oldestFilePath = folderPath + reader[0];
        deleteFile(oldestFilePath);
      }
    }
  };

  useEffect(() => {
    RNFS.exists(folderPath).then(exists => {
      if (!exists) {
        makeDir();
      }
    });
    RNFS.exists(filePath).then(exists => {
      if (exists) {
        listFiles();
        console.log('path' + filePath);
        //loadFile();
      } else {
        getFile();
        downloadAudio();
        listFiles();
      }
    });
    lruCacheEviction();
  });
  return (
    <View>
      <TrackButton trackName={`${title}`} trackSource={trackPath} artist={''} />
    </View>
  );
};

export default AudioSource;
