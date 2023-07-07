import {useNavigation, useRoute} from '@react-navigation/core';
import React, {ReactElement, useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../common/CustomButton';
import {AUDIO} from '../../constants/routeNames';
import styles from './styles';
import PlaylistItem from '../PlaylistItem';
import Container from '../common/Container';
import {ScrollView} from 'react-native-gesture-handler';
import Config from 'react-native-config';
import {AuthContext} from '../../context/providers/authProvider';

const PlaylistComponent: () => ReactElement = () => {
  const data = useRoute().params;
  const {navigate} = useNavigation();
  const authContext = useContext(AuthContext);
  const userId: string = authContext.user.uid;
  const [tracks, setTracks] = useState<string[]>([]);

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

  console.log(tracks[0]);
  return (
    <View>
      <Text style={styles.title}>{data.playlistTitle.toString()}</Text>
      <ScrollView>
        {tracks[0] !== '' ? (
          tracks.map(track => (
            <View key={track}>
              <PlaylistItem title={track} />
            </View>
          ))
        ) : (
          <View />
        )}
      </ScrollView>
      <CustomButton
        style={styles.button}
        title="Confirm"
        primary
        onPress={() => navigate(AUDIO)}
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
