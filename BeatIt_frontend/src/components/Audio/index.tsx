import React, {ReactElement, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {useEffect} from 'react';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

const tracks = [
  {
    id: '1',
    url: require('../../test_data/audio/yeeling_item.mp3'),
    title: 'Track 1',
    artist: 'Artist 1',
  },
];

const AudioComponent: () => ReactElement = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const setupTrackPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracks);
  };
  useEffect(() => {
    setupTrackPlayer();
  });

  const playPause = () => {
    if (playing) {
      setPlaying(false);
      TrackPlayer.pause;
    } else {
      setPlaying(true);
      TrackPlayer.play;
    }
  };

  const setPlayIcon = () => {
    if (playing) {
      return 'pause';
    } else {
      return 'play';
    }
  };

  return (
    <Container>
      <SearchBar
        icon={<Ionicons name="search" />}
        iconPosition="left"
        placeholder="Search"
      />
      <Text style={styles.subtitle}>Playlists</Text>
      <ScrollView style={styles.scroll} horizontal>
        <View>
          <Image
            style={styles.playlist}
            source={require('../../assets/images/playlistplaceholder.png')}
          />
          <Text style={styles.caption}>playlist1</Text>
        </View>

        <View>
          <Image
            style={styles.playlist}
            source={require('../../assets/images/playlistplaceholder.png')}
          />
          <Text style={styles.caption}>playlist2</Text>
        </View>

        <View>
          <Image
            style={styles.playlist}
            source={require('../../assets/images/playlistplaceholder.png')}
          />
          <Text style={styles.caption}>playlist3</Text>
        </View>
      </ScrollView>
      <Text style={styles.subtitle}>Tracks</Text>
      <ScrollView style={styles.scroll} horizontal>
        <View style={styles.tracks}>
          <TouchableOpacity style={styles.button} onPress={() => playPause()}>
            <View style={styles.buttonIcon}>
              <Ionicons name={setPlayIcon()} size={20}/>
            </View>
          </TouchableOpacity>
          <Text style={styles.caption}>audio1.mp3</Text>
          <TouchableOpacity style={styles.button} onPress={() => playPause()}>
            <View style={styles.buttonIcon}>
              <Ionicons name={setPlayIcon()} size={20}/>
            </View>
          </TouchableOpacity>
          <Text style={styles.caption}>audio2.mp3</Text>
        </View>

        <View style={styles.tracks}>
          <TouchableOpacity style={styles.button} onPress={() => playPause()}>
            <View style={styles.buttonIcon}>
              <Ionicons name={setPlayIcon()} size={20}/>
            </View>
          </TouchableOpacity>
          <Text style={styles.caption}>audio3.mp3</Text>
          <TouchableOpacity style={styles.button} onPress={() => playPause()}>
            <View style={styles.buttonIcon}>
              <Ionicons name={setPlayIcon()} size={20}/>
            </View>
          </TouchableOpacity>
          <Text style={styles.caption}>audio4.mp3</Text>
        </View>

        <View style={styles.tracks}>
          <TouchableOpacity style={styles.button} onPress={() => playPause()}>
            <View style={styles.buttonIcon}>
              <Ionicons name={setPlayIcon()} size={20}/>
            </View>
          </TouchableOpacity>
          <Text style={styles.caption}>audio5.mp3</Text>
          <TouchableOpacity style={styles.button} onPress={() => playPause()}>
            <View style={styles.buttonIcon}>
              <Ionicons name={setPlayIcon()} size={20}/>
            </View>
          </TouchableOpacity>
          <Text style={styles.caption}>audio6.mp3</Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AudioComponent;
