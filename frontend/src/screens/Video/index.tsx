import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import Container from '../../components/common/Container';
import VideoComponent from '../../components/Video';

const Video: () => ReactElement = () => {
    return (
        <Container>
            <VideoComponent />
        </Container>
    );
};

export default Video;
