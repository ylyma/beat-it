import { View, Text, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/core';
import Config from 'react-native-config';

import { AuthContext } from '../../context/providers/authProvider';
import { useTheme } from '@react-navigation/native';
import { AUDIOPLAYBACK } from '../../constants/routeNames';
import { StackNavigationProp } from '@react-navigation/stack';
import { AudioStackParamList } from '../../navigations/AudioPlaybackStack';

const BookmarkCreationComponent = () => {
    const data = useRoute<StackNavigationProp<AudioStackParamList>>().params;
    const navigation = useNavigation();
    const authContext = React.useContext(AuthContext);
    const { navigate } = useNavigation<StackNavigationProp<AudioStackParamList>>();
    const colors = useTheme().colors;
    const [bookmarkName, setBookmarkName] = React.useState('Bookmark ' + data.id);
    const [bookmarkTimestamp, setBookmarkTimestamp] = React.useState(
        data.timestamp.toString(),
    );
    const title = data.title.split('.')[0];
    console.log(title);

    const createBookmark = async () => {
        console.log(data.bookmarks);
        const bookmark = {
            name: bookmarkName,
            timestamp: Number(bookmarkTimestamp),
        };
        data.bookmarks.push(bookmark);
        // post the bookmarks in the database
        console.log('post: ' + JSON.stringify(bookmark));
        console.log(`${Config.API_URL}/bookmarks/${authContext.user.uid}/${title}`);
        await fetch(
            `${Config.API_URL}/bookmarks/${authContext.user.uid}/${title}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookmark),
            },
        )
            .then(response => {
                console.log('set: ' + response.status);
            })
            .catch(error => {
                console.log(error);
            });
        //navigate(AUDIOPLAYBACK);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.lightprimary }]}>
            <View>
                <TextInput
                    style={[
                        styles.input,
                        { color: colors.text, backgroundColor: colors.white },
                    ]}
                    placeholder="Bookmark Name"
                    defaultValue={bookmarkName.toString()}
                    onChangeText={setBookmarkName}
                />
                {/* <TextInput style={styles.input} placeholder="Bookmark Description" /> */}
                <TextInput
                    style={[
                        styles.input,
                        { color: colors.text, backgroundColor: colors.white },
                    ]}
                    placeholder="Bookmark Timestamp (in seconds)"
                    keyboardType="numeric"
                    defaultValue={bookmarkTimestamp}
                    onChangeText={setBookmarkTimestamp}
                />
            </View>

            <TouchableOpacity
                onPress={() => {
                    createBookmark();
                    navigate(AUDIOPLAYBACK);
                }}>
                <Text style={[styles.button, { backgroundColor: colors.success }]}>
                    Create Bookmark
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate(AUDIOPLAYBACK)}>
                <Text style={[styles.button, { backgroundColor: colors.failure }]}>
                    Cancel
                </Text>
            </TouchableOpacity>
        </View>
    );

};

export default BookmarkCreationComponent;
