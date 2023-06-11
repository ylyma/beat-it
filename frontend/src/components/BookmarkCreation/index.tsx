import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/core';

const BookmarkCreationComponent = () => {
    const data = useRoute().params;
    const navigation = useNavigation();

    const [bookmarkName, setBookmarkName] = React.useState("Bookmark " + data.id.toString());
    const [bookmarkTimestamp, setBookmarkTimestamp] = React.useState(data.timestamp.toString());
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Bookmark Name"
                defaultValue={bookmarkName.toString()}
                onChangeText={setBookmarkName} />
            {/* <TextInput style={styles.input} placeholder="Bookmark Description" /> */}
            <TextInput
                style={styles.input}
                placeholder="Bookmark Timestamp (in seconds)"
                keyboardType='numeric'
                defaultValue={bookmarkTimestamp}
                onChangeText={setBookmarkTimestamp} />
            <TouchableOpacity onPress={() => {
                console.log(data.bookmarks);
                data.bookmarks.push(
                    {
                        id: data.id,
                        name: bookmarkName,
                        timestamp: Number(bookmarkTimestamp),
                        artist: data.artist,
                        title: data.title
                    }
                );
                navigation.goBack();
            }} >
                <Text style={styles.button}>Create Bookmark</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookmarkCreationComponent