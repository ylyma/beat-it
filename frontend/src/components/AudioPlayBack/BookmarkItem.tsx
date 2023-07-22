import React from 'react';
import {TouchableOpacity, View} from 'react-native';

type BookmarkItemProps = {name: string; time: number};
const BookmarkItem = ({name, time}: BookmarkItemProps) => {
  const item = `${name}: ${time}`;
  return (
    <View>
      <TouchableOpacity>
        <Text>{item}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkItem;
