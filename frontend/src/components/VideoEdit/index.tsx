import { View, Text, TouchableOpacity, Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Video from 'react-native-video'
import { VideoContext } from '../../context/providers/videoProvider';
import globalStyles from '../../globalStyles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import * as Progress from 'react-native-progress'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import FFmpegWrapper from '../../services/ffMpeg';
import Slider from '@react-native-community/slider';

const VideoEditComponent = () => {
    const videoContext = useContext(VideoContext);
    const [editMode, setEditMode] = useState<String>("")
    const [delay, setDelay] = useState("0")


    const playPause = () => {
        videoContext.dispatch({ type: 'TOGGLE_PAUSE', payload: null })
    };

    const updateTime = (progress) => {
        console.log('progress: ', progress)
        videoContext.dispatch({ type: 'SET_TIME', payload: progress })
    }

    useEffect(() => {
        // set it to pause
        videoContext.dispatch({ type: 'SET_PAUSE', payload: false })
        console.log('paused: ', videoContext.paused)
    }, [])

    if (editMode === 'Overlay Audio') {
        return (
            <View>
                <Text>Overlay Audio</Text>
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
                <View style={styles.buttonContainer}>
                    <Text>Delay(s): </Text>
                    <TextInput placeholder={'Enter time delay in s'} onChangeText={(val) => setDelay(val)} inputMode='decimal' value={delay} />
                    <TouchableOpacity style={styles.functionButton} onPress={() => FFmpegWrapper.changeAudio(videoContext, delay)}>
                        <Text style={styles.functionText}>Align Audio</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={styles.editText}>Overlay Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                            <Text style={styles.editText}>Annotate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                            <Text style={styles.editText}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        )
    } else if (editMode === 'Annotate') {
        return (<View>
            <Text>Annotate</Text>
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
            <ScrollView horizontal={true}>
                <View style={styles.editMode}>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                        <Text style={styles.editText}>Overlay Audio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                        <Text style={styles.editText}>Annotate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                        <Text style={styles.editText}>Mirror</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
        )
    } else if (editMode === 'Mirror') {
        return (<View>
            <Text>Mirror</Text>
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.functionButton} onPress={() => FFmpegWrapper.mirrorVideo(videoContext)}>
                    <Text style={styles.functionText}>Mirror Video</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
                <View style={styles.editMode}>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                        <Text style={styles.editText}>Overlay Audio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                        <Text style={styles.editText}>Annotate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                        <Text style={styles.editText}>Mirror</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
        )
    } else {
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
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={styles.editText}>Overlay Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                            <Text style={styles.editText}>Annotate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                            <Text style={styles.editText}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        )
    }


}

export default VideoEditComponent