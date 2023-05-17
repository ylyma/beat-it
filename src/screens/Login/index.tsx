import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../../../firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';




const Login: () => ReactElement = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Registered with user: ", user.email);
            })
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in with user: ", user.email)
            })
    };

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe =
            onAuthStateChanged(auth, user => {
                if (user) {
                    navigation.navigate("Home")
                }
            })
        return unsubscribe
    }, [])


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        bordercolor: "#0782F9",

    },
    buttonText: {
        color: "white",
        marginTop: 5,
        borderWidth: 2,
    },
    buttonOutline: {
        backgroundColor: "white",
        fontWeight: "600",
        fontSize: 16,
    },
    buttonOutlineText: {
        backgroundColor: "white",
        fontWeight: "700",
        fontSize: 16,
    }
});
export default Login;
