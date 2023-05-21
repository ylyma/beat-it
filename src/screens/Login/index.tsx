import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import CustomButton from '../../components/common/CustomButton';
import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../../../firebase';
import {
    onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithRedirect, getRedirectResult
} from 'firebase/auth';
import HomeTab from '../../navigations/HomeTab';

const Login: () => ReactElement = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            console.log("auth: ", auth)
            if (user) {
                console.log("user: ", user)
                navigation.navigate("HomeTab")
            }
        })
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Registered with user: ", user.email);
            });

    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in with user: ", user.email)
            })
        return <HomeTab />
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);

        getRedirectResult(auth).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
                const token = credential.accessToken;
                const user = result.user;
                console.log("Logged in with user: ", user.email)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("Error: ", errorMessage)
        });
    }

    return (
        <Container>
            <Container>
                <Input
                    label="Username"
                    onChangeText={(text: string) => setEmail(text)}
                    value={email}
                //error={'This field is required'}
                />

                <Input
                    label="Password"
                    onChangeText={(text: string) => setPassword(text)}
                    value={password}
                    icon={<Text>HIDE</Text>}
                    iconPosition="right"
                    error={'This field is required'}
                />
                <CustomButton primary title="Login" onPress={handleLogin} />
                <CustomButton secondary title="Sign Up" onPress={handleSignUp} />
                <CustomButton nofill title="forgot your password?" />
            </Container>

            <Container>
                <Text style={{ paddingBottom: 10 }}>or, login with</Text>

                <View style={{ flexDirection: 'row' }}>
                    <CustomButton icon={<Text>Google</Text>} onPress={handleGoogleLogin} />
                </View>
            </Container>
        </Container>
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
