import {ReactElement} from 'react';
import * as React from 'react';
import Container from '../../components/common/Container';
import PlaylistComponent from '../../components/Playlist/PlaylistCreation';

const Playlist: () => ReactElement = () => {
  return (
    <Container>
      <PlaylistComponent />
    </Container>
  );
};

export default Playlist;
