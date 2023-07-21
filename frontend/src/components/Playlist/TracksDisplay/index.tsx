import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import Config from 'react-native-config';
import {AuthContext} from '../../../context/providers/authProvider';
import PlaylistDisplayItem from '../PlaylistDisplayItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AUDIO, PLAYLISTEDIT} from '../../../constants/routeNames';
import colors from '../../../assets/themes/colors';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import shorthash from 'shorthash';
import {Menu, PaperProvider} from 'react-native-paper';
import {AudioContext} from '../../../context/providers/audioProvider';

const TracksDisplayComponent = () => {
  const data = useRoute().params;
  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;
  const [tracks, setTracks] = useState<string[]>([]);
  const {navigate} = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [queue, setQueue] = useState([]);
  const audioContext = useContext(AudioContext);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const getPlaylistItems = async title => {
      await fetch(
        `${Config.API_URL}/playlists/${userId}/getplaylist/${title}`,
        {
          method: 'GET',
        },
      )
        .then(res => res.text())
        .then(r => {
          const items = r.split(',');
          console.log(items);
          setTracks(items);
        });
    };
    getPlaylistItems(data.title);
  }, []);

  const playPlaylist = async () => {
    await TrackPlayer.reset();
    let queue = new Array();
    for (let i = 0; i < tracks.length; i++) {
      const name = shorthash.unique(tracks[i].split('.')[0]);
      const fileType = tracks[i].split('.')[1];
      const extension = 'file:/';
      const trackPath =
        RNFS.CachesDirectoryPath + '/audio/' + name + '.' + fileType;
      RNFS.touch(extension + trackPath, new Date());
      const track = {
        title: tracks[i],
        url: trackPath,
        artist: '',
      };
      queue.push(track);
    }
    console.log(queue);
    await TrackPlayer.add(queue);
    await TrackPlayer.play();
  };

  useEffect(() => {
    const getQueue = async () => {
      const queue = await TrackPlayer.getQueue();
      const string = queue.map(q => q.title);
      console.log('s' + string);
      const number = await TrackPlayer.getCurrentTrack();
      string.shift();
      for (let i = 0; i < number; i++) {
        string.shift();
      }
      console.log('new' + string);
      setQueue(string);
    };
    getQueue();
  }, [audioContext.currentTrack, audioContext.playing]);

  const deletePlaylist = async title => {
    await fetch(
      `${Config.API_URL}/playlists/${userId}/deleteplaylist/${title}`,
      {
        method: 'DELETE',
      },
    ).catch(error => console.log(error));
  };

  const addSilence = () => {};

  return (
    <ScrollView>
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => {
            navigate(AUDIO);
          }}>
          <Ionicons style={styles.back} name={'arrow-back'} size={20} />
        </TouchableOpacity>
        <PaperProvider>
          <View style={styles.menu}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={() => openMenu()}>
                  <Ionicons
                    style={styles.back}
                    name={'ellipsis-vertical'}
                    size={20}
                  />
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={() => {
                  navigate(PLAYLISTEDIT, {playlistTitle: data.title});
                }}
                title="Edit"
              />
              <Menu.Item
                titleStyle={styles.delete}
                onPress={() => {
                  deletePlaylist(data.title);
                  navigate(AUDIO);
                }}
                title="Delete"
              />
            </Menu>
          </View>
        </PaperProvider>
      </View>

      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.playRow}>
        <TouchableOpacity
          style={styles.play}
          onPress={() => {
            TrackPlayer.skipToPrevious();
          }}>
          <Ionicons name={'play-skip-back'} size={35} color="#f2d177" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.play} onPress={() => playPlaylist()}>
          <Ionicons name={'play'} size={40} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.play}
          onPress={() => {
            TrackPlayer.skipToNext();
          }}>
          <Ionicons name={'play-skip-forward'} size={35} color="#f2d177" />
        </TouchableOpacity>
      </View>
      <View style={styles.wordRow}>
        <Text style={styles.word}>restart</Text>
      </View>
      {tracks[0] !== '' ? (
        tracks.map(track => (
          <View key={track}>
            <PlaylistDisplayItem title={track} />
          </View>
        ))
      ) : (
        <View />
      )}
      <View style={styles.bottom}>
        <View style={styles.bottomContainer}>
          <Text style={styles.queueText}>Next in Queue:</Text>
        </View>
        {queue[0] !== '' ? (
          queue.map(track => (
            <View key={track}>
              <Text style={styles.queueItem}>{track}</Text>
            </View>
          ))
        ) : (
          <View />
        )}
      </View>
    </ScrollView>
  );
};

export default TracksDisplayComponent;
