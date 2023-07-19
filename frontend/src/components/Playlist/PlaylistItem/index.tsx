import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from '../../../assets/themes/colors';
import {useNavigation} from '@react-navigation/core';
import {PLAYLISTTRACKS} from '../../../constants/routeNames';
import Config from 'react-native-config';
import {AuthContext} from '../../../context/providers/authProvider';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import shorthash from 'shorthash';

type PlaylistItemProps = {title: string};

const PlaylistItem = ({title}: PlaylistItemProps) => {
  const {navigate} = useNavigation();
  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;

  const loadPlaylist = async () => {
    await fetch(`${Config.API_URL}/playlists/${userId}/getplaylist/${title}`, {
      method: 'GET',
    })
      .then(res => res.text())
      .then(r => {
        const items = r.split(',');
        console.log(items);
        TrackPlayer.reset();
        let queue = new Array();
        for (let i = 0; i < items.length; i++) {
          const name = shorthash.unique(items[i].split('.')[0]);
          const fileType = items[i].split('.')[1];
          const extension = 'file:/';
          const trackPath =
            RNFS.CachesDirectoryPath + '/audio/' + name + '.' + fileType;
          RNFS.touch(extension + trackPath, new Date());
          const track = {
            title: items[i],
            url: trackPath,
            artist: '',
          };
          queue.push(track);
        }
        console.log(queue);
        TrackPlayer.add(queue);
      })
      .then(() => TrackPlayer.play())
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.item}>
      <View style={styles.inside}>
        <Ionicons
          style={styles.icon}
          name={'musical-notes'}
          size={40}
          color={colors.white}
        />
        <TouchableOpacity
          style={styles.play}
          onPress={() => {
            loadPlaylist();
            navigate(PLAYLISTTRACKS, {title: title});
          }}>
          <Ionicons name={'play'} size={20} color="#f2b307" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default PlaylistItem;
