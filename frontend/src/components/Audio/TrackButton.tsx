import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TrackPlayer from 'react-native-track-player'


type TrackButtonProps = {
    trackName: string,
    playPause: () => void,
    setPlayIcon: () => string
    size: number
    trackSource: string
    artist: string
}
const TrackButton = (props: TrackButtonProps) => {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={
                () => TrackPlayer.add({ title: props.trackName, url: props.trackSource, artist: props.artist }).then(
                    () => props.playPause()
                )}>
                <View style={styles.buttonIcon}>
                    <Ionicons name={props.setPlayIcon()} size={props.size} />
                </View>
            </TouchableOpacity>
            <Text style={styles.caption}>{props.trackName}</Text>
        </View>
    )
}

export default TrackButton