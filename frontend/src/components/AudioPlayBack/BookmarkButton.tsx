import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import TrackPlayer from 'react-native-track-player'

type BookmarkButtonProps = {
    description: string,
    timestamp: number,
}

const BookmarkButton = (props: BookmarkButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={
            () => TrackPlayer.seekTo(props.timestamp).then(() => console.log('seeked to ' + props.timestamp))
        }>
            <Text style={styles.caption}>{props.description}</Text>
        </TouchableOpacity>
    )
}

export default BookmarkButton