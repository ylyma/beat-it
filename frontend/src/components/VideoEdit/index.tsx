import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Video from 'react-native-video';
import {VideoContext} from '../../context/providers/videoProvider';
import globalStyles from '../../globalStyles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
<<<<<<< HEAD
import * as Progress from 'react-native-progress'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FFmpegWrapper from '../../services/ffMpeg';
import Slider from '@react-native-community/slider';
import EditButtons from './EditButtons';
import { useTheme } from '@react-navigation/native';

const VideoEditComponent = () => {
    const videoContext = useContext(VideoContext);
    const [editMode, setEditMode] = useState<String>("")
    const [delay, setDelay] = useState("0")
    const colors = useTheme().colors;
=======
import * as Progress from 'react-native-progress';
import {ScrollView} from 'react-native-gesture-handler';

const VideoEditComponent = () => {
  const videoContext = useContext(VideoContext);
  const [editMode, setEditMode] = useState(null);
>>>>>>> amy_frontend_feature_playlists

  const playPause = () => {
    videoContext.dispatch({type: 'TOGGLE_PAUSE', payload: null});
  };

  const updateTime = progress => {
    console.log('progress: ', progress);
    videoContext.dispatch({type: 'SET_TIME', payload: progress});
  };

<<<<<<< HEAD
    const updateTime = (progress) => {
        console.log('progress: ', progress)
        videoContext.dispatch({ type: 'SET_TIME', payload: progress })
    }

    useEffect(() => {
        // set it to pause
        videoContext.dispatch({ type: 'SET_PAUSE', payload: false })
        console.log('paused: ', videoContext.paused)
    }, [])

    return (
        <View>
            <Video source={videoContext.video}
                paused={videoContext.paused}
                ref={videoContext.videoPlayer}
                style={styles.videoPlayer}
                onProgress={updateTime} />
            <Slider
                style={styles.progressBar}
                value={videoContext.currentTime}
                minimumValue={0}
                maximumValue={videoContext.totalDuration}
                thumbTintColor={colors.secondary}
                minimumTrackTintColor={colors.fourth}
                maximumTrackTintColor={colors.grey}
                onSlidingComplete={(value) => {
                    console.log('value: ', value)
                    console.log('videoContext.videoPlayer: ', videoContext.videoPlayer)
                    videoContext.videoPlayer!.seek(value);
                }} />
            <TouchableOpacity onPress={playPause}>
                <Ionicons name={videoContext.playIcon} style={[globalStyles.icon, { color: colors.black }]} />
            </TouchableOpacity>
            <EditButtons />
        </View>
    )
    // }


}
=======
  useEffect(() => {
    // set it to pause
    videoContext.dispatch({type: 'SET_PAUSE', payload: false});
    console.log('paused: ', videoContext.paused);
  }, []);

  return (
    <View>
      <Video
        source={videoContext.video}
        paused={videoContext.paused}
        ref={videoContext.videoPlayer}
        style={styles.videoPlayer}
        onProgress={updateTime}
      />
      <Progress.Bar
        progress={videoContext.currentTime / videoContext.totalDuration}
        width={null}
        height={10}
        color={'#000'}
        useNativeDriver={true}
      />
      <TouchableOpacity onPress={playPause}>
        <Ionicons name={videoContext.playIcon} style={globalStyles.icon} />
      </TouchableOpacity>
      <ScrollView horizontal={true}>
        <View style={styles.editMode}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode('Overlay Audio')}>
            <Text>Overlay Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode('Annotate')}>
            <Text>Annotate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode('Mirror')}>
            <Text>Mirror</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
>>>>>>> amy_frontend_feature_playlists

export default VideoEditComponent;
