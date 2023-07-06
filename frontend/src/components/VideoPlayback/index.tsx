import { View, Text, TouchableOpacity, Animated, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Video from 'react-native-video'
import { VideoContext } from '../../context/providers/videoProvider';
import globalStyles from '../../globalStyles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Slider from '@react-native-community/slider';
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import FFmpegWrapper from '../../services/ffMpeg';





const VideoPlaybackComponent = () => {
    const videoContext = useContext(VideoContext);
    const [frames, setFrames] = useState<any>([])
    const FRAME_STATUS = Object.freeze({
        LOADING: { name: Symbol('LOADING') },
        READY: { name: Symbol('READY') },
    });

    const playPause = () => {
        videoContext.dispatch({ type: 'TOGGLE_PAUSE', payload: null })

    };

    const updateTime = (progress) => {
        console.log('progress: ', progress)
        videoContext.dispatch({ type: 'SET_TIME', payload: progress })
    }

    const handleOnLoad = (videoAssetLoaded) => {
        const numberOfFrames = Math.ceil(videoAssetLoaded.duration / 2);
        setFrames(
            Array(numberOfFrames).fill({
                status: FRAME_STATUS.LOADING.name.description,
            }),
        );

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
                    console.log(`${filePath.replace('%4d', String(i + 1).padStart(4, 0))}`)
                }
                setFrames(_frames);
                console.log('frames: ', frames)
            },
            () => {
                console.log('Failed to get frames');
            }
        );
    };

    const renderFrame = (frame, index) => {
        // console.log('frame: ', frame)
        // console.log('index: ', index)
        if (frame.status === FRAME_STATUS.LOADING.name.description) {
            return <View style={styles.loadingFrame} key={index}></View>;
        } else {
            return (
                <Image
                    key={index}
                    source={{
                        uri: 'file://' + frame,
                    }}
                    style={{
                        width: 80,
                        height: 40,
                    }}
                />
            );
        }
    };

    useEffect(() => {
        FFmpegWrapper.handleVideoLoad(videoContext).then(() => {
            // set it to pause
            videoContext.dispatch({ type: 'SET_PAUSE', payload: false })
            console.log('paused: ', videoContext.paused)
            console.log('videoContext.video: ', videoContext.video)
        }).catch((err) => {
            console.log('err: ', err)
        })

    }, [])


    return (
        <View>
            <Video id='video'
                source={videoContext.video}
                paused={videoContext.paused}
                ref={(ref) => { videoContext.videoPlayer = ref }}
                style={styles.videoPlayer}
                onProgress={updateTime}
                onLoad={handleOnLoad} />
            <Slider
                style={styles.progressBar}
                value={videoContext.currentTime}
                minimumValue={0}
                maximumValue={videoContext.totalDuration}
                thumbTintColor="#FFD369"
                minimumTrackTintColor="#FFD369"
                maximumTrackTintColor="#fff"
                onSlidingComplete={(value) => {
                    console.log('value: ', value)
                    console.log('videoContext.videoPlayer: ', videoContext.videoPlayer)
                    videoContext.videoPlayer!.seek(value);
                }} />
            <TouchableOpacity onPress={playPause}>
                <Ionicons name={videoContext.playIcon} style={globalStyles.icon} />
            </TouchableOpacity>
            <View style={styles.popLineContainer}>
                <View style={styles.popLine} />
            </View>
            {frames && (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles.framesLine}
                    alwaysBounceHorizontal={true}
                    scrollEventThrottle={1}>
                    <View style={styles.prependFrame}></View>
                    {frames.map((frame, index) => renderFrame(frame, index))}
                    <View style={styles.appendFrame}></View>
                </ScrollView>
            )}
        </View>
    )
}

export default VideoPlaybackComponent