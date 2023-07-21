import React, { useContext, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import { PLAYLISTEDIT, PLAYLISTTRACKS } from '../../../constants/routeNames';
import Config from 'react-native-config';
import { AuthContext } from '../../../context/providers/authProvider';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import shorthash from 'shorthash';
<<<<<<< HEAD
import {useTheme} from '@react-navigation/native';
=======
import { useTheme } from '@react-navigation/native';
>>>>>>> 4ac4e119ee344d68d785fa39d6d3165e3afe2fe0

type PlaylistItemProps = { title: string };

<<<<<<< HEAD
const PlaylistItem = ({title}: PlaylistItemProps) => {
  const {navigate} = useNavigation();
  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;
  const colors = useTheme().colors;
=======
const PlaylistItem = ({ title }: PlaylistItemProps) => {
    const { navigate } = useNavigation();
    const authContext = useContext(AuthContext);
    const userId: string = authContext.user.uid;
    const colors = useTheme().colors;
>>>>>>> 4ac4e119ee344d68d785fa39d6d3165e3afe2fe0

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

    const createTwoButtonAlert = () =>
        Alert.alert('Deleting playlist', `Proceed to delete playlist: ${title}?`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => deletePlaylist(title) },
        ]);
    const deletePlaylist = async title => {
        await fetch(
            `${Config.API_URL}/playlists/${userId}/deleteplaylist/${title}`,
            {
                method: 'DELETE',
            },
        ).catch(error => console.log(error));
    };

    return (
        <View style={[styles.item, { backgroundColor: colors.lightsecondary }]}>
            <View style={styles.insideRow}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        navigate(PLAYLISTEDIT, { playlistTitle: title });
                    }}>
                    <Ionicons name={'create'} size={15} color={colors.success} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        createTwoButtonAlert();
                    }}>
                    <Ionicons
                        name={'trash-bin'}
                        size={15}
                        color={colors.failure}
                    />
                </TouchableOpacity>
            </View>

            <View style={[styles.inside, { backgroundColor: colors.secondary }]}>
                <Ionicons
                    style={styles.icon}
                    name={'musical-notes'}
                    size={40}
                    color={colors.alwayswhite}
                />
                <TouchableOpacity
                    style={[styles.play, { backgroundColor: colors.alwayswhite }]}
                    onPress={() => {
                        loadPlaylist();
                        navigate(PLAYLISTTRACKS, { title: title });
                    }}>
                    <Ionicons name={'play'} size={20} color={colors.fourth} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.text, { color: colors.alwaysblack }]}>{title}</Text>
        </View>
    );
};

export default PlaylistItem;
