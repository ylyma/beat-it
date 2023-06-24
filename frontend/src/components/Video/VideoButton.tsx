import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch } from 'react'
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

type VideoButtonProps = {
    video: any,
    action: Dispatch<any>,
};

const VideoButton = (props: VideoButtonProps) => {

    const playVideo = () => {
        props.action(props.video)
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={
                playVideo
            } onLongPress={
                playVideo
            }>
                <View style={styles.buttonIcon}>
                    <Ionicons name={'play'} size={20} />
                </View>
            </TouchableOpacity>
            <Text >{props.video.name}</Text>

        </View>
    )
}

export default VideoButton