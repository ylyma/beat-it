import { View, Text, FlatList } from 'react-native'
import React, { Children, Dispatch, ReactElement } from 'react'
import VideoButton from './VideoButton';

type VideoButtonGeneratorProps = {
    video: any,
    action: Dispatch<any>,
};

const VideoButtonGenerator = (props: VideoButtonGeneratorProps) => {

    const children: ReactElement[] = []

    for (let i = 0; i < props.video.length; i++) {
        children.push(
            <View key={i}>
                <VideoButton videoName={props.video[i]} userId={''} reload={() => { }} />
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