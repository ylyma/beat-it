// lib/FFmpeg.js
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { VideoContext } from '../context/providers/videoProvider';
import { useContext } from 'react';


const FRAME_PER_SEC = 1;
const FRAME_WIDTH = 80;

//change this to functional component
const FFmpegWrapper = {
    handleVideoLoad: async function handliVideoLoad(context) {
        const codecs = ["mp4", "mov"]
        if (codecs.some((codec) => context.video.uri.toLowerCase().includes(codec))) {
            console.log("No need to convert")
        } else {
            console.log("Converting")
            const input = await FFmpegKitConfig.getSafParameterForRead(context.video.uri);
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
        let outputImageDir = `${RNFS.CachesDirectoryPath}/${localFileName}`;
        RNFS.mkdir(outputImageDir);
        let outputImagePath = `${RNFS.CachesDirectoryPath}/${localFileName}_%4d.png`;
        const input = await FFmpegKitConfig.getSafParameterForRead(videoURI);
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
    }

}


export default FFmpegWrapper;