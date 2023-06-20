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

    // make this play immediately
    const playTrack = async () => {
        await TrackPlayer.getCurrentTrack().then(async (trackId) => {
            console.log(trackId);
            let queueLength;
            await TrackPlayer.getQueue().then((queue) => {
                queueLength = queue.length;
                console.log(queueLength);
            })
            if (queueLength == 0) {
                console.log("adding first track");
                TrackPlayer.add({ title: props.trackName, url: props.trackSource, artist: props.artist }).then(
                    () => TrackPlayer.play())
            } else {
                trackId = trackId + 1;
                TrackPlayer.add({ title: props.trackName, url: props.trackSource, artist: props.artist }, trackId).then(
                    () => TrackPlayer.skipToNext().then(
                        () => TrackPlayer.play())
                )
            }
        }).catch((error) => {
            console.log(error)
        }
        )
        TrackPlayer.getQueue().then((queue) => {
            console.log(queue)
        }
        )
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={
                playTrack
            } onLongPress={
                addToQueue
            }>
                <View style={styles.buttonIcon}>
                    <Ionicons name={'play'} size={20} />
                </View>
            </TouchableOpacity>
            <Text style={styles.songTitle}>{props.trackName}</Text>

        </View>
    )
}

export default TrackButton