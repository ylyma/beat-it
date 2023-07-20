import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import TrackPlayer from 'react-native-track-player'
import { useTheme } from '@react-navigation/native'

type BookmarkButtonProps = {
    description: string,
    timestamp: number,
}

const BookmarkButton = (props: BookmarkButtonProps) => {
    const colors = useTheme().colors

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={
            () => TrackPlayer.seekTo(props.timestamp).then(() => console.log('seeked to ' + props.timestamp))
        }>
            <Text style={[styles.bookmarkCaption, { color: colors.text }]}>{props.description}</Text>
        </TouchableOpacity>
    )
}

export default BookmarkButton