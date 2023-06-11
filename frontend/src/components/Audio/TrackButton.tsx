import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TrackPlayer, { useTrackPlayerEvents, Event, State } from 'react-native-track-player'
import { AudioContext } from '../../context/providers/audioProvider'


type TrackButtonProps = {
    trackName: string,
    // size: number
    trackSource: string | number
    artist: string
}

const TrackButton = (props: TrackButtonProps) => {
    // const [currentTrack, setCurrentTrack] = React.useState("No Track Playing");
    // const [playing, setPlaying] = React.useState(true);
    // const [playIcon, setPlayIcon] = React.useState("play");
    const audioContext = React.useContext(AudioContext);


    const addToQueue = () => {
        console.log(audioContext.noTrack);
        TrackPlayer.add({ title: props.trackName, url: props.trackSource, artist: props.artist }).then(
            () => audioContext.playing ? TrackPlayer.play() : TrackPlayer.pause()
        )
    };
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={
                addToQueue
            }>
                <View style={styles.buttonIcon}>
                    <Ionicons name={'add-circle'} size={20} />
                </View>
            </TouchableOpacity>
            <Text style={styles.caption}>{props.trackName}</Text>
        </View>
    )
}

export default TrackButton