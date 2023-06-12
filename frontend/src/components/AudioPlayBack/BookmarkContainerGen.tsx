import { View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import BookmarkButton from './BookmarkButton'
import { AudioContext } from '../../context/providers/audioProvider'

// to be used when we have a backend to store bookmarks
type Bookmark = {
    id: string,
    name: string,
    timestamp: number,
    title: string,
    artist: string,
}

type BookmarkContainerGenProps = {
    bookmarks: Bookmark[]
}

const BookmarkContainerGen = (props: BookmarkContainerGenProps) => {
    const audioContext = React.useContext(AudioContext)
    return (
        <FlatList
            data={props.bookmarks.filter((bookmark) => bookmark.title === audioContext.currentTrack && bookmark.artist === audioContext.currentArtist)}
            renderItem={({ item }) => BookmarkButton({ name: item.name, timestamp: item.timestamp })}
            keyExtractor={(item) => item.id}
        />
    )
}

export default BookmarkContainerGen