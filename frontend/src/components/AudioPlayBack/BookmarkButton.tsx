import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useContext} from 'react';
import styles from './styles';
import TrackPlayer from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import {AuthContext} from '../../context/providers/authProvider';

type BookmarkButtonProps = {
  name: string;
  time: number;
  reload: () => void;
  title: string;
};

const BookmarkButton = (props: BookmarkButtonProps) => {
  const colors = useTheme().colors;
  const content = `${props.name}: `;
  const authContext = useContext(AuthContext);

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Deleting bookmark',
      `Proceed to delete bookmark: ${props.name}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteTrack();
            setTimeout(props.reload, 500);
          },
        },
      ],
    );

  const deleteTrack = async () => {
    await fetch(
      `${Config.API_URL}/bookmarks/${authContext.user.uid}/${props.title}/${props.name}/${props.time}`,
      {
        method: 'DELETE',
      },
    ).catch(error => console.log(error));
  };

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.secondary}]}
      onPress={() =>
        TrackPlayer.seekTo(props.time).then(() =>
          console.log('seeked to ' + props.time),
        )
      }>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            createTwoButtonAlert();
          }}>
          <Ionicons name={'trash-bin'} size={15} color={colors.failure} />
        </TouchableOpacity>
        <Text style={[styles.bookmarkCaption, {color: colors.text}]}>
          {content}
        </Text>
        <Text style={styles.bookmarkTime}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookmarkButton;
