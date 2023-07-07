import React from 'react';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

type PlaylistContainerProps = {tracks: string[]};

const PlaylistContainer = ({tracks}: PlaylistContainerProps) => {
  const [data, setData] = useState([]);
  return (
    <DraggableFlatList
      data={tracks}
      onDragEnd={({data}) => setData(data)}
      keyExtractor={item => item.key}
      renderItem={renderItem}
    />
  );
};

export default PlaylistContainer;
