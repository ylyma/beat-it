import React, {useEffect} from 'react';
import {ListItem} from '@rneui/themed';

type PlaylistItemProps = {
  title: string;
  update: (track: string, add: boolean) => void;
};
const PlaylistTrackItem = ({title, update}: PlaylistItemProps) => {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    update(title, checked);
  }, [checked, title]);

  return (
    <>
      <ListItem bottomDivider>
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
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default PlaylistTrackItem;
