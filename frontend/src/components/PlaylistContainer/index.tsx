import React, {useEffect, useState} from 'react';
import {ListItem} from 'react-native-elements';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PlaylistContainerProps = {tracks: Set<string>; refresh: boolean};

const PlaylistContainer = ({tracks, refresh}: PlaylistContainerProps) => {
  const [data, setData] = useState<string[]>([]);
  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <ListItem onLongPress={drag} disabled={isActive}>
          <Ionicons name="menu" size={20} />
          <Text>{item}</Text>
        </ListItem>
      </ScaleDecorator>
    );
  };

  useEffect(() => {
    setData(Array.from(tracks));
    console.log(data);
  }, [refresh]);

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => setData(data)}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
};

export default PlaylistContainer;
