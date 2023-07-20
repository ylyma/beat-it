import { View, Text, TouchableOpacity } from 'react-native';
import React, { Dispatch, ReactElement, useContext, useState } from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS, { DownloadFileOptions, downloadFile } from 'react-native-fs';
import shorthash from 'shorthash';
import Config from 'react-native-config';
import { VideoContext } from '../../context/providers/videoProvider';
import * as ScopedStorage from 'react-native-scoped-storage';
import { VIDEOPLAYBACK } from '../../constants/routeNames';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeTabParamList } from '../../navigations/HomeTab';
import { useTheme } from '@react-navigation/native';

type VideoButtonProps = {
    videoName: string;
    userId: string;
};
const VideoButton: (props: VideoButtonProps) => ReactElement = ({
    videoName,
    userId,
}: VideoButtonProps) => {
    const videoContext = useContext(VideoContext);
    const colors = useTheme().colors;
    const navigation = useNavigation<StackNavigationProp<HomeTabParamList>>();
    const name = shorthash.unique(videoName.split('.')[0]);
    const extension = 'file:/';
    const fileType = videoName.split('.')[1];
    //cache directory path: /data/user/0/com.beatit/cache
    const folderPath = extension + RNFS.CachesDirectoryPath + '/video/';
    const filePath = folderPath + name + '.' + fileType;
    const videoPath =
        RNFS.CachesDirectoryPath + '/video/' + name + '.' + fileType;

    const makeDir = () => {
        RNFS.mkdir(folderPath);
        console.log('folder created');
    };

    const [url, setUrl] = useState<string>('');
    const getFile = async () => {
        try {
            const response = await fetch(
                `${Config.API_URL}/uploads/${userId}/getvideo/${videoName}`,
                {
                    method: 'GET',
                },
            ).then(res => res.text());
            console.log(response);
            setUrl(response);
        } catch (error) {
            console.log(error);
            downloadVideo();
        }
    };

    const downloadVideo = async (): Promise<any> => {

        const options: DownloadFileOptions = {
            fromUrl: url,
            toFile: filePath,
        };
        const response = await downloadFile(options);
        return response.promise.then(async res => {
            if (res && res.statusCode === 200 && res.bytesWritten > 0) {
                console.log('ok!');
                const video = {
                    uri: videoPath,
                    name: videoName,
                };
                videoContext.dispatch({ type: 'SET_VIDEO', payload: video });

            } else {
                console.log('booo');
                console.log(res.statusCode);
            }
        })
            .catch(error => {
                console.log(error)
                // downloadVideo()
            });
    };

    const listFiles = async () => {
        try {
            const reader = await RNFS.readDir(folderPath);
            console.log('folder: ' + folderPath);
            for (let i = 0; i < reader.length; i++) {
                const item = reader[i];

                console.log('files:' + i + '_' + item.name);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const loadFile = async () => {
        RNFS.exists(folderPath).then(exists => {
            if (!exists) {
                console.log('making folder');
                makeDir();
            }
            console.log('folder exists');
        }).then(() => RNFS.exists(filePath).then(async (exists) => {
            if (exists) {
                RNFS.stat(filePath).then(file => console.log(file.mtime));
                const current = new Date();
                RNFS.touch(filePath, current);
                RNFS.stat(filePath).then(file => console.log(file.mtime));
                listFiles();
            } else {
                console.log('file doesnt exist');
                getFile()
                downloadVideo()
                listFiles()

            }
        }));
    };

    const playVideo = async () => {
        console.log('before load video');
        loadFile().then(() => console.log('file loaded'))
            .then(() => {
                const video = {
                    uri: videoPath,
                    name: videoName,
                };
                videoContext.dispatch({ type: 'SET_VIDEO', payload: video });
                navigation.navigate(VIDEOPLAYBACK);
            });
        // const videoObject = await ScopedStorage.listFiles(videoPath);

    };

    return (
        <View style={[styles.buttonContainer,]}>
            <TouchableOpacity onPress={() => playVideo()}>
                <View style={[styles.buttonIcon, { backgroundColor: colors.fourth }]}>
                    <Ionicons name={'play'} size={20} color={colors.alwaysdark} />
                </View>
            </TouchableOpacity>
            <Text style={[styles.videoTitle, { color: colors.secondaryText }]}>{videoName}</Text>
        </View>
    );
};

export default VideoButton;
