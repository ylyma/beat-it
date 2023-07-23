import React, { useEffect, useState } from 'react';
import { ListItem } from 'react-native-elements';
import DraggableFlatList, {
    ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

type PlaylistContainerProps = {
    tracks: Set<string>;
    refresh: boolean;
};

const PlaylistTrackContainer = ({ tracks, refresh }: PlaylistContainerProps) => {
    const [data, setData] = useState<string[]>([]);
    const colors = useTheme().colors;
    const renderItem = ({ item, drag, isActive }: any) => {
        return (
            <ScaleDecorator>
                <ListItem onLongPress={drag} disabled={isActive} containerStyle={{ backgroundColor: colors.white }}>
                    <Ionicons name="menu" size={20} color={colors.text} />
                    <Text style={{ color: colors.text }}>{item}</Text>
                </ListItem>
            </ScaleDecorator>
        );
    };

    useEffect(() => {
        setData(Array.from(tracks));
        console.log(data);
    }, [refresh]);

    return (
        <DraggableFlatList
            data={data}
            onDragEnd={({ data }) => setData(data)}
            keyExtractor={item => item}
            renderItem={renderItem}
        />
    );
};

export default PlaylistTrackContainer;
