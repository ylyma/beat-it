import React, {ReactElement} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container';
import AudioSource from '../../components/Audio/AudioSource';
import RNFS from 'react-native-fs';

const Settings: () => ReactElement = () => {
  return (
    <Container>
      <AudioSource userId={'9'} title={'imagetest'} fileType={'jpg'} />
      <Text> {RNFS.CachesDirectoryPath}</Text>
    </Container>
  );
};

export default Settings;
