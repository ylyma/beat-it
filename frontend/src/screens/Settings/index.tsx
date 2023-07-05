import React, {ReactElement} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container';
import RNFS from 'react-native-fs';
import VideoSource from '../../components/Video/VideoSource';
import AudioSource from '../../components/Audio/AudioSource';
import TrackContainer from '../../components/Audio/TrackContainer';

const Settings: () => ReactElement = () => {
  return (
    <Container>
      <VideoSource userId={'8'} title={'videotest.mov'} />
      <TrackContainer userId={'7'} />
    </Container>
  );
};

export default Settings;
