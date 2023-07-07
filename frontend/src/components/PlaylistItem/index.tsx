import React from 'react';
import {ListItem} from '@rneui/themed';
type PlaylistItemProps = {title: string};
const PlaylistItem = ({title}: PlaylistItemProps) => {
  const [checked, setChecked] = React.useState([false, false]);
  return (
    <>
      <ListItem bottomDivider>
        <ListItem.CheckBox
          // Use ThemeProvider to change the defaults of the checkbox
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checked={checked[0]}
          onPress={() => setChecked([!checked[0], checked[1]])}
        />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default PlaylistItem;
