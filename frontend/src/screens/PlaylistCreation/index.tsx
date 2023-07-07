import React, {ReactElement} from 'react';
import Container from '../../components/common/Container';
import PlaylistComponent from '../../components/PlaylistCreation';

const Playlist: () => ReactElement = () => {
  return (
    <Container>
      <PlaylistComponent />
    </Container>
  );
};

export default Playlist;
