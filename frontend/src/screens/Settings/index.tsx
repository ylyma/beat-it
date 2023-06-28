import React, {ReactElement} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container';
import AudioSource from '../../components/Audio/AudioSource';
import RNFS from 'react-native-fs';
import VideoSource from '../../components/Video/VideoSource';

const Settings: () => ReactElement = () => {
  return (
    <Container>
      <AudioSource userId={'7'} title={'test'} fileType={'mp3'} />
      <VideoSource userId={'8'} title={'videotest'} fileType={'mov'} />
      <Text> {RNFS.CachesDirectoryPath}</Text>
    </Container>
  );
};

export default Settings;
