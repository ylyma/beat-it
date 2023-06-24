import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Dimensions,
    Pressable,
    Text,
    StyleSheet,
    View,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import { FFmpegKit, ReturnCode, FFmpegKitConfig } from 'ffmpeg-kit-react-native';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const getFileNameFromPath = path => {
    const fragments = path.split('/');
    let fileName = fragments[fragments.length - 1];
    fileName = fileName.split('.')[0];
    return fileName;
};

// const getFilePathFromUri = async (uri) => {
//     uri = await uri.replaceAll('%3A', ':')
//     uri = await uri.replaceAll('%2F', '/')
//     console.log('uri: ', uri)

//     if (uri.startsWith('content://')) {
//         console.log('content')
//         const urlComponents = uri.split('/')
//         console.log('urlComponents: ', urlComponents)
//         const fileNameAndExtension = urlComponents[urlComponents.length - 1]
//         console.log('fileNameAndExtension: ', fileNameAndExtension)
//         const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`
//         console.log('destPath: ', destPath)
//         await RNFS.copyFile(uri, destPath)
//         console.log('file://' + destPath)
//         return 'file://' + destPath;
//     }
//     else {
//         return uri
//     }

// };

const VideoEditComponent = () => {
    // const data = useRoute().params;
    // const video = getFilePathFromUri(data.video.uri);
    // const videoName = data.video.name
    // console.log('videoName: ', videoName)
    // console.log('video: ', video)

    useEffect(() => {
        handleVideoLoad();
    }, []);


    const handleVideoLoad = () => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.videos()],
        }, (error, res) => {
            // Android
            console.log(
                res.uri,
                res.type, // mime type
                res.fileName,
                res.fileSize
            );
        });
        // let outputImagePath = `${RNFS.CachesDirectoryPath}/${videoName}_export.mp4`;
        // console.log(outputImagePath);
        // console.log(`-i ${video} -c:v mpeg4 ${outputImagePath}`);
        // FFmpegKit.execute(
        //     `-i ${video} -c:v copy ${outputImagePath}`,
        // ).then(async session => {
        //     const state = FFmpegKitConfig.sessionStateToString(
        //         await session.getState(),
        //     );
        //     const returnCode = await session.getReturnCode();
        //     const failStackTrace = await session.getFailStackTrace();
        //     const duration = await session.getDuration();

        //     if (ReturnCode.isSuccess(returnCode)) {
        //         console.log(
        //             `Encode completed successfully in ${duration} milliseconds;`,
        //         );
        //     } else if (ReturnCode.isCancel(returnCode)) {
        //         console.log('Encode canceled');
        //     } else {
        //         console.log(
        //             `Encode failed with state ${state} and rc ${returnCode}.${(failStackTrace, '\\n')
        //             }`,
        //         );
        //     }
        // });
    };

    return (
        <SafeAreaView style={styles.mainContainer}>

            <View style={styles.videoContainer}>
                {/* <Video
                    style={styles.video}
                    resizeMode={'cover'}
                    source={{ uri: video.uri }}
                    repeat={true}
                    onLoad={handleVideoLoad}
                /> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 16,
    },
    buttonText: {
        color: '#fff',
    },
    videoContainer: {
        width: SCREEN_WIDTH,
        height: 0.6 * SCREEN_HEIGHT,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    video: {
        height: '100%',
        width: '100%',
    },
});

export default VideoEditComponent