import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Track } from 'react-native-track-player'
import TrackButton from './TrackButton'
import styles from './styles'

type TrackContainerGenProps = {
    tracks: Track[]
}

const TrackContainerGen = (props: TrackContainerGenProps) => {
    const length = props.tracks.length
    const children: React.JSX.Element[] = []

    for (let i = 0; i < length; i++) {
        children.push(
            <View style={styles.tracks} key={i}>
                <TrackButton trackName={props.tracks[i].title!} trackSource={props.tracks[i].url} artist={props.tracks[i].artist!} />
            </View>
        )
    }

    return (
        <View>
            {children}
        </View>
    )
}

export default TrackContainerGen