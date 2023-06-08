import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import TrackPlayer, { useTrackPlayerEvents, Event, State, useProgress, usePlaybackState } from 'react-native-track-player';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AudioContext } from '../../context/providers/audioProvider';
import Slider from '@react-native-community/slider';
import BookmarkContainerGen from './BookmarkContainerGen';
import { useNavigation } from '@react-navigation/core';

const bookmarks = [
    { id: '1', name: 'bookmark 1hcjalhcdbqwhjkbdhqwbiqwbiuqwbuiqwbiqwu', timestamp: 10, artist: 'yeeling', title: 'evo yeeling' },
    { id: '2', name: 'bookmark 2', timestamp: 20, artist: 'yeeling', title: 'evo yeeling' },
    { id: '3', name: 'bookmark 3', timestamp: 30, artist: 'yeeling', title: 'evo yeeling' },
    { id: '4', name: 'bookmark 4', timestamp: 60, artist: 'yeeling', title: 'evo yeeling' },
    { id: '5', name: 'bookmark 5', timestamp: 70, artist: 'yeeling', title: 'evo yeeling' },
    { id: '6', name: 'bookmark 6', timestamp: 90, artist: 'yeeling', title: 'evo yeeling' },
    { id: '7', name: 'bookmark 7', timestamp: 100, artist: 'yeeling', title: 'evo yeeling' },
    { id: '8', name: 'bookmark 8', timestamp: 110, artist: 'yeeling', title: 'evo yeeling' },
    { id: '9', name: 'bookmark 9', timestamp: 120, artist: 'yeeling', title: 'evo yeeling' },
    { id: '10', name: 'bookmark 10', timestamp: 130, artist: 'yeeling', title: 'evo yeeling' },
    { id: '11', name: 'bookmark 11', timestamp: 170, artist: 'yeeling', title: 'evo yeeling' },
    { id: '12', name: 'bookmark 12', timestamp: 200, artist: 'yeeling', title: 'evo yeeling' },
    { id: '13', name: 'bookmark 13', timestamp: 210, artist: 'yeeling', title: 'evo yeeling' },
    { id: '14', name: 'bookmark 14', timestamp: 250, artist: 'yeeling', title: 'evo yeeling' },
    { id: '15', name: 'bookmark 15', timestamp: 260, artist: 'yeeling', title: 'evo yeeling' },
    { id: '16', name: 'bookmark 16', timestamp: 50, artist: 'NUS DE', title: 'Floor Luigis' },
    { id: '17', name: 'bookmark 17', timestamp: 100, artist: 'NUS DE', title: 'Floor Luigis' },
    { id: '18', name: 'bookmark 18', timestamp: 150, artist: 'NUS DE', title: 'Floor Luigis' },
]

const events = [
    Event.PlaybackState,
    Event.PlaybackError,
];

const AudioPlayBackComponent = () => {
    // build a playback page
    const audioContext = useContext(AudioContext);
    const { position, duration } = useProgress();
    const [bookmarkList, setBookmarkList] = React.useState(bookmarks);
    const navigation = useNavigation();

    const addBookmark = () => {
        // to be replaced with a bookmark setting page
        // add a bookmark to the current track
        const nextId = bookmarks.length + 1;
        navigation.navigate('BookmarkCreation',
            {
                bookmarks: bookmarkList,
                id: nextId.toString(),
                timestamp: position,
                artist: audioContext.currentArtist,
                title: audioContext.currentTrack
            })
    }

    const playPause = () => {
        if (audioContext.playing) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
    };

    const skipToPrevious = () => {
        TrackPlayer.skipToPrevious();
    }

    const skipToNext = () => {
        TrackPlayer.skipToNext();
    }

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
                <Text style={styles.subtitle}>
                    Bookmarks
                </Text>
                <BookmarkContainerGen bookmarks={bookmarks} />
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
                    }} />
            </View>
            <View style={styles.timeAndBookmarkContainer}>
                <Text style={styles.time}>
                    {audioContext.format(position) + " / " + audioContext.format(duration)}
                </Text>
                <TouchableOpacity onPress={addBookmark}>
                    <Ionicons name="bookmarks" style={styles.bookmark} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={skipToPrevious} >
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

    )
}

export default AudioPlayBackComponent