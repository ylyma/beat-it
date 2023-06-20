import { View, Text, FlatList } from 'react-native'
import React, { Children, Dispatch } from 'react'
import VideoButton from './VideoButton';

type VideoButtonGeneratorProps = {
    video: any,
    action: Dispatch<any>,
};

const VideoButtonGenerator = (props: VideoButtonGeneratorProps) => {

    const children: React.JSX.Element[] = []

    for (let i = 0; i < props.video.length; i++) {
        children.push(
            <View key={i}>
                <VideoButton video={props.video[i]} action={props.action} />
            </View>
        )
    }

    return (
        <View>
            {children}
        </View>
    )
}

export default VideoButtonGenerator