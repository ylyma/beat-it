import React, {ReactElement} from 'react';
import Container from '../../components/common/Container';
<<<<<<< HEAD
=======
import RNFS from 'react-native-fs';
>>>>>>> main
import VideoSource from '../../components/Video/VideoSource';

const Settings: () => ReactElement = () => {
  return (
    <Container>
      <VideoSource userId={'8'} title={'videotest.mov'} />
    </Container>
  );
};

export default Settings;
