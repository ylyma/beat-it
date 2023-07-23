import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { AudioContext } from '../../../context/providers/audioProvider';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import shorthash from 'shorthash';
import { useTheme } from '@react-navigation/native';

type PlaylistDisplayItemProps = { title: string };
const PlaylistDisplayItem = ({ title }: PlaylistDisplayItemProps) => {
    const audioContext = React.useContext(AudioContext);
    const colors = useTheme().colors;

    const playTrack = async () => {
        await TrackPlayer.reset();
        const name = shorthash.unique(title.split('.')[0]);
        const fileType = title.split('.')[1];
        const extension = 'file:/';
        const trackPath =
            RNFS.CachesDirectoryPath + '/audio/' + name + '.' + fileType;
        RNFS.touch(extension + trackPath, new Date());
        const track = {
            title: title,
            url: trackPath,
            artist: '',
        };
        await TrackPlayer.add(track).then(() => TrackPlayer.play());
    };

    const pauseTrack = async () => {
        await TrackPlayer.pause();
    };
    return (
        <View style={styles.row}>
            <Ionicons style={styles.icon} name={'musical-note'} size={15} />

            <Text style={[styles.text, { color: colors.alwaysblack }]}>{title}</Text>

            {audioContext.playing && audioContext.currentTrack === title ? (
                <TouchableOpacity
                    style={styles.play}
                    onPress={() => {
                        pauseTrack();
                    }}>
                    <Ionicons name={'pause'} size={15} color={colors.darkyellow} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.play}
                    onPress={() => {
                        playTrack();
                    }}>
                    <Ionicons name={'play'} size={15} color={colors.darkyellow} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default PlaylistDisplayItem;
