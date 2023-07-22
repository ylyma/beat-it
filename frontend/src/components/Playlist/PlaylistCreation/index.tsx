import {useNavigation, useRoute} from '@react-navigation/core';
import React, {ReactElement, useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../../common/CustomButton';
import {AUDIO} from '../../../constants/routeNames';
import styles from './styles';
import Config from 'react-native-config';
import {AuthContext} from '../../../context/providers/authProvider';
import {NestableScrollContainer} from 'react-native-draggable-flatlist';
import PlaylistTrackContainer from '../PlaylistTrackContainer';
import PlaylistTrackItem from '../PlaylistTrackItem';
import {useTheme} from '@react-navigation/native';

const PlaylistComponent: () => ReactElement = () => {
  const data = useRoute().params;
  const {navigate} = useNavigation();
  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;
  const [tracks, setTracks] = useState<string[]>([]);
  const [allTracks, setAllTracks] = useState<Set<string>>(new Set());
  const [update, setUpdate] = useState<boolean>(true);
  const colors = useTheme().colors;

  useEffect(() => {
    const getAllAudio = async () => {
      const response = await fetch(
        `${Config.API_URL}/uploads/${userId}/getaudio`,
        {
          method: 'GET',
        },
      )
        .then(res => res.text())
        .then(r => {
          console.log(r);
          let titles = r.split('/');
          for (let i = 0; i < titles.length; i++) {
            titles[i] = titles[i].replace(`#audio_${userId}_`, '');
          }
          console.log('hi ' + titles);
          setTracks(titles);
        });
    };
    getAllAudio();
  }, [userId]);

  const updateTracks = (track, add) => {
    if (add) {
      allTracks.add(track);
      setAllTracks(allTracks);
    } else {
      allTracks.delete(track);
      setAllTracks(allTracks);
    }
    console.log('hiehi');
    console.log(allTracks);
    setUpdate(!update);
    //setAllTracks(new Set());
  };
  //TODO: send as file or string? try tostring and see if it works

  const postPlaylist = () => {
    const playlist = {
      title: data.playlistTitle,
      body: Array.from(allTracks).join(','),
    };
    fetch(`${Config.API_URL}/playlists/${userId}`, {
      body: JSON.stringify(playlist),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
      });
  };

  console.log(allTracks);
  return (
    <View style={{backgroundColor: colors.lightsecondary}}>
      <Text style={styles.title}>Add Songs</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.playlistTitle}>
          {data.playlistTitle.toString()}
        </Text>
      </View>
      <View style={styles.topList}>
        <NestableScrollContainer>
          <PlaylistTrackContainer tracks={allTracks} refresh={update} />
        </NestableScrollContainer>
      </View>
      <View style={styles.list}>
        {tracks[0] !== '' ? (
          tracks.map(track => (
            <View key={track}>
              <PlaylistTrackItem
                title={track}
                update={updateTracks}
                exists={false}
              />
            </View>
          ))
        ) : (
          <View />
        )}
      </View>
      <CustomButton
        style={styles.button}
        title="Confirm"
        primary
        onPress={() => {
          postPlaylist();
          navigate(AUDIO);
        }}
      />
      <CustomButton
        style={styles.button}
        title="Cancel"
        failure
        onPress={() => navigate(AUDIO)}
      />
    </View>
  );
};

export default PlaylistComponent;
