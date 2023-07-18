import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import styles from './styles'
import FFmpegWrapper from '../../services/ffMpeg'
import { VideoContext } from '../../context/providers/videoProvider'
import { AuthContext } from '../../context/providers/authProvider'

const EditButtons = () => {
    const videoContext = useContext(VideoContext);
    const [editMode, setEditMode] = useState<String>("")
    const [delay, setDelay] = useState("0")
    const authContext = useContext(AuthContext);
    const userId = authContext.user.uid;

    if (editMode === 'Overlay Audio') {

        return (
            <View>
                <View style={styles.buttonContainer}>
                    <Text>Delay(s): </Text>
                    <TextInput placeholder={'Enter time delay in s'} onChangeText={(val) => setDelay(val)} inputMode='decimal' value={delay} />
                    <TouchableOpacity style={styles.functionButton} onPress={() => FFmpegWrapper.changeAudio(videoContext, delay, userId)}>
                        <Text style={styles.functionText}>Align Audio</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={styles.editText}>Overlay Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                            <Text style={styles.editText}>Annotate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                            <Text style={styles.editText}>Mirror</Text>
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
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={styles.editText}>Overlay Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                            <Text style={styles.editText}>Annotate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                            <Text style={styles.editText}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )

    } else if (editMode === 'Mirror') {
        return (
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.functionButton} onPress={() => FFmpegWrapper.mirrorVideo(videoContext, userId)}>
                        <Text style={styles.functionText}>Mirror Video</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>
                    <View style={styles.editMode}>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={styles.editText}>Overlay Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                            <Text style={styles.editText}>Annotate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                            <Text style={styles.editText}>Mirror</Text>
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
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Overlay Audio')}>
                            <Text style={styles.editText}>Overlay Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Annotate')}>
                            <Text style={styles.editText}>Annotate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode('Mirror')}>
                            <Text style={styles.editText}>Mirror</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )


    }
}

export default EditButtons