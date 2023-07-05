import React, {ReactElement} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container';
import RNFS from 'react-native-fs';
import VideoSource from '../../components/Video/VideoSource';

const Settings: () => ReactElement = () => {
  return (
    <Container>
      <VideoSource userId={'8'} title={'videotest.mov'} />
    </Container>
  );
};

export default Settings;
