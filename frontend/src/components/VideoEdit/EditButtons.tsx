import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from './styles'
import FFmpegWrapper from '../../services/ffMpeg'
import { VideoContext } from '../../context/providers/videoProvider'
import { AuthContext } from '../../context/providers/authProvider'
import { useTheme } from '@react-navigation/native'

const EditButtons = () => {
    const videoContext = useContext(VideoContext);
    const [editMode, setEditMode] = useState<String>("")
    const [delay, setDelay] = useState("0")
    const authContext = useContext(AuthContext);
    const userId = authContext.user.uid;
    const colors = useTheme().colors;

    if (editMode === 'Overlay Audio') {

        return (
            <View>
                <View style={styles.buttonContainer}>
                    <Text style={{ color: colors.text }}>Delay(s): </Text>
                    <TextInput placeholder={'Enter time delay in s'} onChangeText={(val) => setDelay(val)} inputMode='decimal' value={delay} placeholderTextColor={colors.text} style={{ color: colors.text }} />
                    <TouchableOpacity style={[styles.functionButton, { backgroundColor: colors.secondary }]} onPress={() => FFmpegWrapper.changeAudio(videoContext, delay, userId)}>
                        <Text style={[styles.functionText, { color: colors.white }]}>Align Audio</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Overlay Audio</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Annotate')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Annotate</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Mirror')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    } else if (editMode === 'Annotate') {
        return (
            <View>
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Overlay Audio</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Annotate')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Annotate</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Mirror')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )

    } else if (editMode === 'Mirror') {
        return (
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.functionButton, { backgroundColor: colors.secondary }]} onPress={() => FFmpegWrapper.mirrorVideo(videoContext, userId)}>
                        <Text style={[styles.functionText, { color: colors.white }]}>Mirror Video</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Overlay Audio</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Annotate')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Annotate</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Mirror')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )

    } else {
        return (
            <View>
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Overlay Audio</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Annotate')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Annotate</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.primary }]} onPress={() => setEditMode('Mirror')}>
                            <Text style={[styles.editText, { color: colors.white }]}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )


    }
}

export default EditButtons