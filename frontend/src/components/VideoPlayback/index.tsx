import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {VideoContext} from '../../context/providers/videoProvider';
import globalStyles from '../../globalStyles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Slider from '@react-native-community/slider';
import {FFmpegKit, FFmpegKitConfig, ReturnCode} from 'ffmpeg-kit-react-native';
import FFmpegWrapper from '../../services/ffMpeg';
import {useTheme} from '@react-navigation/native';

const VideoPlaybackComponent = () => {
  const videoContext = useContext(VideoContext);
  const [frames, setFrames] = useState<any>([]);
  const FRAME_STATUS = Object.freeze({
    LOADING: {name: Symbol('LOADING')},
    READY: {name: Symbol('READY')},
  });
  const [framesLineOffset, setFramesLineOffset] = useState({x: 0, y: 0});
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = useRef(
    (videoContext.currentTime / videoContext.totalDuration) * 80,
  ).current;
  const colors = useTheme().colors;

  const playPause = () => {
    videoContext.dispatch({type: 'TOGGLE_PAUSE', payload: null});
  };

  const updateTime = progress => {
    // console.log('progress: ', progress)
    videoContext.dispatch({type: 'SET_TIME', payload: progress});
    setFramesLineOffset({
      x:
        parseInt(
          (progress.currentTime / progress.seekableDuration).toString(),
        ) * 80,
      y: 0,
    });
  };

  const handleOnLoad = videoAssetLoaded => {
    const numberOfFrames = Math.ceil(videoAssetLoaded.duration / 2);
    setFrames(
      Array(numberOfFrames).fill({
        status: FRAME_STATUS.LOADING.name.description,
      }),
    );
    console.log(videoContext);

    FFmpegWrapper.getFrames(
      videoContext.video.name,
      videoContext.video.uri,
      numberOfFrames,
      filePath => {
        const _frames: string[] = [];
        for (let i = 0; i < numberOfFrames; i++) {
          _frames.push(
            `${filePath.replace('%4d', String(i + 1).padStart(4, 0))}`,
          );
          console.log(
            `${filePath.replace('%4d', String(i + 1).padStart(4, 0))}`,
          );
        }
        setFrames(_frames);
        console.log('frames: ', frames);
      },
      () => {
        console.log('Failed to get frames');
      },
    );
  };

  const renderFrame = frame => {
    // console.log('frame: ', frame)
    // console.log('index: ', index)
    if (frame.status === FRAME_STATUS.LOADING.name.description) {
      return <View style={styles.loadingFrame} key={frame.index}></View>;
    } else {
      return (
        <Image
          key={frame.index}
          source={{
            uri: 'file://' + frame.item,
          }}
          style={{
            width: 80,
            height: 40,
          }}
        />
      );
    }
  };

  const handleOnScroll = ({nativeEvent}) => {
    console.log('scrolling', framesLineOffset);
    setFramesLineOffset(nativeEvent.contentOffset.x);
  };

  useEffect(() => {
    FFmpegWrapper.handleVideoLoad(videoContext)
      .then(() => {
        // set it to pause
        videoContext.dispatch({type: 'SET_PAUSE', payload: false});
        console.log('paused: ', videoContext.paused);
        console.log('videoContext.video: ', videoContext.video);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }, []);

  return (
    <View>
      <Video
        id="video"
        source={videoContext.video}
        paused={videoContext.paused}
        ref={ref => {
          videoContext.videoPlayer = ref;
        }}
        style={styles.videoPlayer}
        onProgress={updateTime}
        // onLoad={handleOnLoad}
      />
      <Slider
        style={styles.progressBar}
        value={videoContext.currentTime}
        minimumValue={0}
        maximumValue={videoContext.totalDuration}
        thumbTintColor={colors.secondary}
        minimumTrackTintColor={colors.fourth}
        maximumTrackTintColor={colors.grey}
        onSlidingComplete={value => {
          console.log('value: ', value);
          console.log('videoContext.videoPlayer: ', videoContext.videoPlayer);
          videoContext.videoPlayer!.seek(value);
        }}
      />
      <TouchableOpacity onPress={playPause}>
        <Ionicons
          name={videoContext.playIcon}
          style={[globalStyles.icon, {color: colors.black}]}
        />
      </TouchableOpacity>
      {/* <View style={styles.popLineContainer}>
                <View style={styles.popLine} />
            </View> */}
      {/* <View>
                <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        scrolling.setValue(event.nativeEvent.contentOffset.x)
                        console.log("scolling", scrolling)
                        console.log("translation", translation)
                    }} contentOffset={framesLineOffset}
                    style={{ transform: [{ translateX: translation }] }}
                >
                    <View style={styles.prependFrame}>
                    </View>
                    <FlatList data={frames} horizontal showsHorizontalScrollIndicator={false} renderItem={renderFrame} />
                    <View style={styles.appendFrame}>
                    </View>
                </Animated.ScrollView>

            </View> */}
    </View>
  );
};

export default VideoPlaybackComponent;
