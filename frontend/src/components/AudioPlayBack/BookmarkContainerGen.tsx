import { View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import styles from './styles';
import BookmarkButton from './BookmarkButton';

type Bookmark = {
    name: string;
    time: number;
};

type BookmarkContainerGenProps = {
    bookmarks: Bookmark[];
    reload: () => void;
    title: string;
};

const BookmarkContainerGen = (props: BookmarkContainerGenProps) => {
    return (
        // <FlatList
        //   data={props.bookmarks}
        //   renderItem={({item}) =>
        //     BookmarkButton({
        //       description: item.name,
        //       timestamp: item.time,
        //     })
        //   }
        //   keyExtractor={item => item.time.toString()}
        // />
        <View style={styles.bookmarkDisplay}>
            {props.bookmarks.length > 0 ? props.bookmarks[0].name !== '' ? (
                props.bookmarks.map(bookmark => (
                    <View key={bookmark.time}>
                        <BookmarkButton
                            title={props.title}
                            name={bookmark.name}
                            time={bookmark.time}
                            reload={props.reload}></BookmarkButton>
                    </View>
                ))
            ) : (
                <View />
            ) : (
                <View />
            )}
        </View>
    );
};

export default BookmarkContainerGen;
