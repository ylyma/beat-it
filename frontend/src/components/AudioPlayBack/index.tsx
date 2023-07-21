import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AudioContext} from '../../context/providers/audioProvider';
import Slider from '@react-native-community/slider';
import BookmarkContainerGen from './BookmarkContainerGen';
import {useNavigation} from '@react-navigation/core';
import Config from 'react-native-config';
import {AuthContext} from '../../context/providers/authProvider';
import 'react-native-get-random-values';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AudioPlayBackComponent = () => {
  // build a playback page
  const audioContext = useContext(AudioContext);
  const {position, duration} = useProgress();
  const [bookmarkList, setBookmarkList] = React.useState([]);
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const colors = useTheme().colors;
  const [upload, setUpload] = useState<boolean>(false);

  useEffect(() => {
    const getBookmarks = async () => {
      await fetch(
        `${Config.API_URL}/bookmarks/${authContext.user.uid}/${
          audioContext.currentTrack.split('.')[0]
        }`,
        {
          method: 'GET',
        },
      )
        .then(res => res.text())
        .then(r => {
          const items = r.split('/');
          let bkm = new Array();
          console.log(items);
          for (let i = 0; i < items.length; i++) {
            items[i] = items[i].replace(
              `#bookmark_${authContext.user.uid}_${
                audioContext.currentTrack.split('.')[0]
              }_`,
              '',
            );
            console.log(items[i]);
            const name = items[i].split('_')[0];
            console.log(name);
            const time = Number(items[i].split('_')[1]);
            console.log(time);
            bkm.push({name, time});
          }
          console.log(bkm);
          setBookmarkList(bkm);
        });
      // console.log("getBookmarks: " + test.status);
      // console.log("bookmarks: " + JSON.stringify(testJson))
    };
    getBookmarks();
  }, [audioContext.currentTrack, upload]);

  const reload = () => {
    setUpload(!upload);
  };

  const addBookmark = () => {
    // to be replaced with a bookmark setting page
    // add a bookmark to the current track
    const nextId = bookmarkList.length + 1;
    navigation.navigate('BookmarkCreation', {
      bookmarks: bookmarkList,
      id: nextId.toString(),
      timestamp: position,
      title: audioContext.currentTrack,
    });
  };

  const playPause = () => {
    if (audioContext.playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  const skipToPrevious = () => {
    TrackPlayer.skipToPrevious();
  };

  const skipToNext = () => {
    TrackPlayer.skipToNext();
  };

  return (
    // the player should be a full screen page with play/pause button, next track, previous track,
    // bookmarks, track info, and a seek bar
    // the player should be able to be minimized to a mini player
    // the mini player should be able to be maximized to the full screen player

    <View style={[styles.container, {backgroundColor: colors.lightsecondary}]}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name={'arrow-back'} size={25} color={colors.black} />
      </TouchableOpacity>
      <View>
        <Text style={[styles.titleText, {color: colors.text}]}>
          {audioContext.currentTrack}
        </Text>
      </View>
      <View style={[styles.bookmarkContainer]}>
        <View style={styles.bookmarksRow}>
          <Text style={[styles.subtitle, {color: colors.text}]}>Bookmarks</Text>
          <TouchableOpacity
            style={styles.refresh}
            onPress={() => {
              reload();
            }}>
            <View>
              <Ionicons name={'refresh'} size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <BookmarkContainerGen
          title={audioContext.currentTrack.split('.')[0]}
          bookmarks={bookmarkList}
          reload={reload}
        />
      </View>
      <View style={styles.bottomBar}>
        <Slider
          style={styles.progressBar}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor={colors.secondary}
          minimumTrackTintColor={colors.fourth}
          maximumTrackTintColor={colors.othergrey}
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>
      <View style={styles.timeAndBookmarkContainer}>
        <Text style={[styles.time, {color: colors.text}]}>
          {audioContext.format(position) +
            ' / ' +
            audioContext.format(duration)}
        </Text>
        <TouchableOpacity onPress={addBookmark}>
          <MaterialCommunityIcons
            name="bookmark-plus"
            size={20}
            style={styles.bookmark}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={skipToPrevious}>
          <Ionicons name="play-back" style={styles.icon} color={colors.black} />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPause}>
          <Ionicons
            name={audioContext.playIcon}
            style={styles.icon}
            color={colors.black}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext}>
          <Ionicons
            name="play-forward"
            style={styles.icon}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioPlayBackComponent;
