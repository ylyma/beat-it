import {ReactElement} from 'react';
import * as React from 'react';
import Container from '../../components/common/Container';
import TracksDisplayComponent from '../../components/Playlist/TracksDisplay';

const PlaylistTracks: () => ReactElement = () => {
  return (
    <Container>
      <TracksDisplayComponent />
    </Container>
  );
};

export default PlaylistTracks;
