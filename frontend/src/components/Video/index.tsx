import { View, Text, Button } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av';

const VideoComponent = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View style={
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }
        }>
            <Video
                ref={video}
                source={{
                    uri: 'file://Users/ivanlee/Developer/BeatIt/frontend/src/test_data/video/IMG_0735.MOV',
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View >
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
            </View>
        </View>
    )
}

export default VideoComponent