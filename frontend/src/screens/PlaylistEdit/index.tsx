import {ReactElement} from 'react';
import * as React from 'react';
import Container from '../../components/common/Container';
import PlaylistEditComponent from '../../components/Playlist/PlaylistEdit';

const PlaylistEdit: () => ReactElement = () => {
  return (
    <Container>
      <PlaylistEditComponent />
    </Container>
  );
};

export default PlaylistEdit;
