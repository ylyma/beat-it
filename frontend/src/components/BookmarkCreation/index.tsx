import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/core';
import Config from 'react-native-config';
import { AuthContext } from '../../context/providers/authProvider';
import { useTheme } from '@react-navigation/native';

const BookmarkCreationComponent = () => {
    const data = useRoute().params;
    const navigation = useNavigation();
    const authContext = React.useContext(AuthContext);
    const colors = useTheme().colors;

    const [bookmarkName, setBookmarkName] = React.useState("Bookmark " + data.id.toString());
    const [bookmarkTimestamp, setBookmarkTimestamp] = React.useState(data.timestamp.toString());

    const createBookmark = async () => {
        console.log(data.bookmarks);
        const bookmark = {
            description: bookmarkName,
            timestamp: Number(bookmarkTimestamp),
            artist: data.artist,
            title: data.title,
        }
        data.bookmarks.push(
            bookmark
        );
        // post the bookmarks in the database
        console.log("post: " + JSON.stringify(bookmark));
        console.log(Config.API_URL + '/bookmarks/' + authContext.user.uid)
        await fetch(Config.API_URL + '/bookmarks/' + authContext.user.uid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookmark)
        }).then((response) => {
            console.log("set: " + response.status);
        }).catch((error) => {
            console.log(error);
        });
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.light }]}>
            <TextInput
                style={[styles.input, { color: colors.text, backgroundColor: colors.white }]}
                placeholder="Bookmark Name"
                defaultValue={bookmarkName.toString()}
                onChangeText={setBookmarkName} />
            {/* <TextInput style={styles.input} placeholder="Bookmark Description" /> */}
            <TextInput
                style={[styles.input, { color: colors.text, backgroundColor: colors.white }]}
                placeholder="Bookmark Timestamp (in seconds)"
                keyboardType='numeric'
                defaultValue={bookmarkTimestamp}
                onChangeText={setBookmarkTimestamp} />
            <TouchableOpacity onPress={createBookmark} >
                <Text style={[styles.button, { backgroundColor: colors.secondary }]}>Create Bookmark</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookmarkCreationComponent