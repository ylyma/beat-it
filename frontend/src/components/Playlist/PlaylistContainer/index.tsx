import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/providers/authProvider';
import Config from 'react-native-config';
import { ScrollView, View } from 'react-native';
import PlaylistItem from '../PlaylistItem';
import styles from './styles';

type PlaylistContainerProps = { refresh: boolean, setRefresh: any, search: string };

const PlaylistContainer = ({ refresh, setRefresh, search }: PlaylistContainerProps) => {
    const authContext = useContext(AuthContext);
    const userId: string = authContext.user.uid;
    const [playlists, setPlaylists] = useState<string[]>([]);

    useEffect(() => {
        const getPlaylistTitles = async () => {
            await fetch(`${Config.API_URL}/playlists/${userId}/getplaylist`, {
                method: 'GET',
            })
                .then(res => res.text())
                .then(r => {
                    console.log(r);
                    let titles = r.split('/');
                    for (let i = 0; i < titles.length; i++) {
                        titles[i] = titles[i].replace(`#playlist_${userId}_`, '');
                    }
                    console.log('hi ' + titles);
                    setPlaylists(titles);
                });
        };
        getPlaylistTitles();
    }, [refresh, userId]);

    return (
        <ScrollView style={styles.scroll} horizontal>
            {/* {playlists[0] !== '' ? (
                playlists.map(playlist => (
                    <View key={playlist}>
                        <PlaylistItem title={playlist} setRefresh={setRefresh} />
                    </View>
                ))
            ) : (
                <View />
            )} */}
            {playlists[0] !== '' ? (
                playlists.map(playlist =>
                    search == undefined ? (
                        <View key={playlist}>
                            <View key={playlist}>
                                <PlaylistItem title={playlist} setRefresh={setRefresh} />
                            </View>
                        </View>
                    ) : playlist.toLowerCase().includes(search) ? (
                        <View key={playlist}>
                            <View key={playlist}>
                                <PlaylistItem title={playlist} setRefresh={setRefresh} />
                            </View>
                        </View>
                    ) : (
                        <View></View>
                    ),
                )
            ) : (
                <View />
            )}
        </ScrollView >
    );
};

export default PlaylistContainer;
