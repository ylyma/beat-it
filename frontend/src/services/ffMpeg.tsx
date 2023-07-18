// lib/FFmpeg.js
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { useContext } from 'react';
import Config from 'react-native-config';
import { AuthContext } from '../context/providers/authProvider';
import DocumentPicker, { types } from 'react-native-document-picker';



const FRAME_PER_SEC = 1;
const FRAME_WIDTH = 80;
const extension = 'file://';
const handleDocumentSelection = async (userId) => {
    try {
        const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            type: [types.video],
            allowMultiSelection: true,
        });
        //let tee = [];
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]);
            postVideo(response[i], userId);
            //tee.push(response[i].name);
        }
        //setTitles(tee);
    } catch (err) {
        console.warn(err);
    }
};

const postVideo = async (file, userId) => {
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

//change this to functional component
const FFmpegWrapper = {
    handleVideoLoad: async function handliVideoLoad(context) {
        const codecs = ["mp4", "mov"]
        if (codecs.some((codec) => context.video.uri.toLowerCase().includes(codec))) {
            console.log("No need to convert")
        } else {
            console.log("Converting")
            const input = await FFmpegKitConfig.getSafParameterForRead(extension + context.video.uri);
            const output = await FFmpegKitConfig.selectDocumentForWrite(context.video.name + '.mp4', 'video/*').then((res) => {
                return FFmpegKitConfig.getSafParameterForWrite(res)
            });
            console.log('input: ', input)
            console.log('output: ', output)
            let outputImagePath = `${output}`;
            console.log('outputImagePath: ', outputImagePath)
            FFmpegKit.execute(
                `-i ${input} -c:v mpeg4 ${output}`,
            ).then(async session => {
                const state = FFmpegKitConfig.sessionStateToString(
                    await session.getState(),
                );
                const returnCode = await session.getReturnCode();
                const failStackTrace = await session.getFailStackTrace();
                const duration = await session.getDuration();

                if (ReturnCode.isSuccess(returnCode)) {
                    console.log(
                        `Encode completed successfully in ${duration} milliseconds;`,
                    );
                    context.dispatch({ type: 'SET_VIDEO', payload: { uri: output } })
                } else if (ReturnCode.isCancel(returnCode)) {
                    console.log('Encode canceled');
                } else {
                    console.log(
                        `Encode failed with state ${state} and rc ${returnCode}.${(failStackTrace, '\\n')}`,
                    );
                }
            });
        }
    },

    getFrames: async function (
        localFileName,
        videoURI,
        frameNumber,
        successCallback,
        errorCallback,
    ) {
        console.log('getFrames')
        console.log('localFileName: ', localFileName)
        console.log('videoURI: ', videoURI)
        let outputImageDir = `${RNFS.CachesDirectoryPath}/${localFileName}`;
        RNFS.mkdir(outputImageDir);
        let outputImagePath = `${RNFS.CachesDirectoryPath}/${localFileName}_%4d.png`;
        const input = await FFmpegKitConfig.getSafParameterForRead(extension + videoURI);
        // const output = await FFmpegKitConfig.selectDocumentForWrite(outputImagePath).then((res) => {
        //     console.log(res)
        // FFmpegKitConfig.getSafParameterForWrite(outputImagePath);
        // });
        console.log('input: ', input)
        console.log('output: ', outputImagePath)
        const ffmpegCommand = `-ss 0 -i ${input} -vf "fps=${FRAME_PER_SEC}/1:round=up,scale=${FRAME_WIDTH}:-2" -vframes ${frameNumber} ${outputImagePath}`;
        console.log('ffmpegCommand: ', ffmpegCommand)
        FFmpegKit.executeAsync(
            ffmpegCommand,
            async session => {
                const state = FFmpegKitConfig.sessionStateToString(
                    await session.getState(),
                );
                const returnCode = await session.getReturnCode();
                const failStackTrace = await session.getFailStackTrace();
                const duration = await session.getDuration();

                if (ReturnCode.isSuccess(returnCode)) {
                    console.log(
                        `Encode completed successfully in ${duration} milliseconds;.`,
                    );
                    console.log(`Check at ${outputImagePath}`);
                    successCallback(outputImagePath);
                } else {
                    console.log('Encode failed. Please check log for the details.');
                    console.log(
                        `Encode failed with state ${state} and rc ${returnCode}.${(failStackTrace, '\\n')
                        }`,
                    );
                    errorCallback();
                }
            },
            log => {
                console.log(log.getMessage());
            },
            statistics => {
                console.log(statistics);
            },
        ).then(session =>
            console.log(
                `Async FFmpeg process started with sessionId ${session.getSessionId()}.`,
            ),
        );
    },

    // new function to change the audio of the video with selected audio
    changeAudio: async function changeAudio(context, delay: string, userId) {
        const input = await FFmpegKitConfig.getSafParameterForRead(extension + context.video.uri);
        const output = await FFmpegKitConfig.selectDocumentForWrite(context.video.name.split(".")[0] + "_audio_overlaid" + '.mp4', 'video/*').then((res) => {
            return FFmpegKitConfig.getSafParameterForWrite(res)
        }
        );
        const audio = await FFmpegKitConfig.selectDocumentForRead().then((res) => { return FFmpegKitConfig.getSafParameterForRead(res) });
        console.log('input: ', input)
        console.log('output: ', output)
        console.log('audio: ', audio)
        console.log('delay: ', delay)
        const volume = "0.2";
        // console.log("ffmpeg " + `-i ${input} -itsoffset ${delay} -i ${audio} -c:v copy -map 0:v:0 -map 1:a:0 -shortest ${output}`)
        // console.log("ffmpeg " + `-i ${input} -itsoffset ${delay} -i ${audio} -map 1:a:0 -map 0:v:0 -shortest ${output}`)
        let cmd = "";
        if (Number(delay) >= 0) {
            cmd = `-i ${input} -i ${audio} -filter_complex "aevalsrc=0:d=${delay}[s1];[0:a]volume=${volume}[va];[s1][1:a]concat=n=2:v=0:a=1[ac2];[va]apad[ac1];[ac1][ac2]amerge=2[a]" -map "[a]" -map 0:v:0 -shortest ${output}`
        } else {
            const newDelay = delay.replace("-", "")
            cmd = `-i ${input} -ss ${newDelay} -i ${audio} -filter_complex "[0:a]volume=${volume}[va];[1:a]apad[ac1];[va][ac1]amerge=2[a]" -map "[a]" -map 0:v:0 ${output}`
        };

        console.log('cmd: ', cmd)
        FFmpegKit.execute(
            cmd,
        ).then(async session => {
            const state = FFmpegKitConfig.sessionStateToString(
                await session.getState(),
            );
            const returnCode = await session.getReturnCode();
            const failStackTrace = await session.getFailStackTrace();
            const duration = await session.getDuration();
            console.log('state: ', state)
            console.log('returnCode: ', returnCode)
            console.log('failStackTrace: ', failStackTrace)
            console.log('duration: ', duration)

            if (ReturnCode.isSuccess(returnCode)) {
                console.log(
                    `Encode completed successfully in ${duration} milliseconds;`,
                );
                await handleDocumentSelection(userId);
                console.log("uploaded")
                context.dispatch({ type: 'SET_VIDEO', payload: { name: context.video.name.split(".")[0] + "_audio_overlaid", uri: output } })
            } else if (ReturnCode.isCancel(returnCode)) {
                console.log('Encode canceled');
            } else {
                console.log(
                    `Encode failed with state ${state} and rc ${returnCode}.${(failStackTrace, '\\n')}`,
                );
            }
        }
        );
    },
    mirrorVideo: async function mirrorVideo(context, userId) {
        const input = await FFmpegKitConfig.getSafParameterForRead(extension + context.video.uri);
        const output = await FFmpegKitConfig.selectDocumentForWrite(context.video.name.split(".")[0] + "_mirrored" + '.mp4', 'video/*').then((res) => {
            return FFmpegKitConfig.getSafParameterForWrite(res)
        });
        console.log('input: ', input)
        console.log('output: ', output)
        FFmpegKit.execute(
            `-i ${input} -vf "hflip" ${output}`,
        ).then(async session => {
            const state = FFmpegKitConfig.sessionStateToString(
                await session.getState(),
            );
            const returnCode = await session.getReturnCode();
            const failStackTrace = await session.getFailStackTrace();
            const duration = await session.getDuration();

            if (ReturnCode.isSuccess(returnCode)) {
                console.log(
                    `Encode completed successfully in ${duration} milliseconds;`,
                );

                await handleDocumentSelection(userId);
                console.log("uploaded")
                context.dispatch({ type: 'SET_VIDEO', payload: { name: context.video.name.split(".")[0] + "_mirrored", uri: context.video.name.split(".")[0] + "_mirrored" + '.mp4' } })
            } else if (ReturnCode.isCancel(returnCode)) {
                console.log('Encode canceled');
            } else {
                console.log(
                    `Encode failed with state ${state} and rc ${returnCode}.${(failStackTrace, '\\n')}`,
                );
            }
        }
        );
    },

}


export default FFmpegWrapper;