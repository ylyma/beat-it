import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';
import { VideoContext } from '../../context/providers/videoProvider';
import DocumentPicker, { types } from 'react-native-document-picker';
import { AuthContext } from '../../context/providers/authProvider';
import Config from 'react-native-config';
import VideosContainer from './VideosContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '../common/SearchBar';
import { useTheme } from '@react-navigation/native';

const VideoComponent = () => {
    // const [video, setVideo] = React.useState<any>(null);
    //const [allVideos, setAllVideos] = useState<any>([]);
    const videoContext = useContext(VideoContext);
    const authContext = useContext(AuthContext);
    const userId: string = authContext.user.uid;
    const [upload, setUpload] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const colors = useTheme().colors;

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
    const postVideo = async (file: any) => {
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

    // const handlePress = vid => {
    //   videoContext.dispatch({type: 'SET_VIDEO', payload: vid});
    //   navigation.navigate(VIDEOPLAYBACK);
    // };

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
                    <Text style={[styles.addButton,
                    { backgroundColor: colors.secondary }
                    ]}>Import Videos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.videoContainer}>
                <VideosContainer userId={userId} refresh={false} search={search} />

            </View>
        </View>
    );
};

export default VideoComponent;
