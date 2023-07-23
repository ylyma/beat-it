import React, { useEffect } from 'react';
import { ListItem } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';

type PlaylistItemProps = {
    title: string;
    update: (track: string, add: boolean) => void;
    exists: boolean;
};
const PlaylistTrackItem = ({ title, update, exists }: PlaylistItemProps) => {
    const [checked, setChecked] = React.useState(exists);
    const colors = useTheme().colors;

    useEffect(() => {
        update(title, checked);
    }, [checked, title]);

    return (
        <>
            <ListItem bottomDivider containerStyle={{ backgroundColor: colors.white }}>
                <ListItem.CheckBox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checked={checked}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.text }}>{title}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </>
    );
};

export default PlaylistTrackItem;
