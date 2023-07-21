import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';
import { VideoContext } from '../../context/providers/videoProvider';
import DocumentPicker, { types } from 'react-native-document-picker';
import { AuthContext } from '../../context/providers/authProvider';
import Config from 'react-native-config';
import VideosContainer from './VideosContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import SearchBar from '../common/SearchBar';

const VideoComponent = () => {
    // const [video, setVideo] = React.useState<any>(null);
    //const [allVideos, setAllVideos] = useState<any>([]);
    const videoContext = useContext(VideoContext);
    const authContext = useContext(AuthContext);
    const userId: string = authContext.user.uid;
    const [upload, setUpload] = useState<boolean>(true);
    const colors = useTheme().colors;
    const [search, setSearch] = useState<string>('');
    console.log(userId);

    // const importVideos = async () => {
    //   console.log('You can use the storage');
    //   documentFolder = await ScopedStorage.openDocumentTree(true);
    //   console.log(documentFolder);
    //   const videoObjects = await ScopedStorage.listFiles(documentFolder.uri);
    //   console.log(videoObjects);

    //   let tempVideos: any[] = [];
    //   for (let i = 0; i < videoObjects.length; i++) {
    //     if (
    //       videoObjects[i].type === 'file' &&
    //       videoObjects[i].mime.split('/')[0] === 'video'
    //     ) {
    //       tempVideos.push(videoObjects[i]);
    //     } else {
    //       continue;
    //     }
    //   }
    //   setAllVideos(tempVideos);
    //   console.log(allVideos);
    // };

    const handleDocumentSelection = async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.video],
                allowMultiSelection: true,
            });
            //let tee = [];
            for (let i = 0; i < response.length; i++) {
                console.log(response[i]);
                postVideo(response[i]);
                //tee.push(response[i].name);
            }
            //setTitles(tee);
        } catch (err) {
            console.warn(err);
        }
    };
    const postVideo = async file => {
        let body = new FormData();
        body.append('file', file);

        fetch(`${Config.API_URL}/uploads/video/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: body,
        })
            .then(res => {
                console.log('response' + JSON.stringify(res));
            })
            .catch(e => console.log(e));
    };

    const reload = async () => {
        setUpload(!upload);
    };

    return (
        <View>
            <SearchBar
                icon={<Ionicons name="search" />}
                iconPosition="left"
                placeholder="Search"
                value={search}
                onChangeText={(value: string) => {
                    console.log(value);
                    setSearch(value.toLowerCase());
                }}
            />
            <View style={styles.titleAndButton}>
                <Text style={[styles.subtitle, { color: colors.text }]}>Video</Text>
                <TouchableOpacity
                    style={styles.refresh}
                    onPress={() => {
                        setUpload(!upload);
                    }}>
                    <View>
                        <Ionicons name={'refresh'} size={20} color={colors.grey} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDocumentSelection()}>
                    <Text
                        style={[
                            styles.addButton,
                            { backgroundColor: colors.secondary, color: colors.alwayswhite },
                        ]}>
                        Import Videos
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.trackContainer}>
                <VideosContainer userId={userId} refresh={upload} search={search} />
            </View>
        </View>
    );
};

export default VideoComponent;
