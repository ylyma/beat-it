import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect} from 'react';
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

const events = [Event.PlaybackState, Event.PlaybackError];

const AudioPlayBackComponent = () => {
  // build a playback page
  const audioContext = useContext(AudioContext);
  const {position, duration} = useProgress();
  const [bookmarkList, setBookmarkList] = React.useState([]);
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const getBookmarks = async () => {
    const test = await fetch(
      Config.API_URL + '/bookmarks/' + authContext.user.uid,
      {
        method: 'GET',
      },
    );

    const testJson = await test.json();
    // console.log("getBookmarks: " + test.status);
    // console.log("bookmarks: " + JSON.stringify(testJson))
    if (test.status === 200) {
      return testJson;
    } else {
      return [];
    }
  };

  useEffect(() => {
    getBookmarks().then(bookmarks => {
      setBookmarkList(bookmarks);
    });
  }, []);

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

    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>{audioContext.currentTrack}</Text>
      </View>
      <View style={styles.bookmarkContainer}>
        <Text style={styles.subtitle}>Bookmarks</Text>
        <BookmarkContainerGen bookmarks={bookmarkList} />
      </View>
      <View style={styles.bottomBar}>
        <Slider
          style={styles.progressBar}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor="#FFD369"
          minimumTrackTintColor="#FFD369"
          maximumTrackTintColor="#fff"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
      </View>
      <View style={styles.timeAndBookmarkContainer}>
        <Text style={styles.time}>
          {audioContext.format(position) +
            ' / ' +
            audioContext.format(duration)}
        </Text>
        <TouchableOpacity onPress={addBookmark}>
          <Ionicons name="bookmarks" style={styles.bookmark} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={skipToPrevious}>
          <Ionicons name="play-back" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPause}>
          <Ionicons name={audioContext.playIcon} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext}>
          <Ionicons name="play-forward" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioPlayBackComponent;
