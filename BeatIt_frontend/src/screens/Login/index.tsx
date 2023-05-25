import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import CustomButton from '../../components/common/CustomButton';
import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../../firebase';
import {
    onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup
} from 'firebase/auth';
import LoginComponent from '../../components/Login';
import HomeTab from '../../navigations/HomeTab';

const Login: () => ReactElement = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();
    useEffect(() => {
        onAuthStateChanged(auth, user => {

            if (user) {
                console.log("Logged in with user: ", user.email)

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
            })
        return
    };

    // const handleGoogleLogin = async () => {
    //     const provider = new GoogleAuthProvider();
    //     console.log("Google Login")
    //     await signInWithRedirect(auth, provider);
    //     console.log("Google Login 2")
    //     await getRedirectResult(auth).then((result) => {
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         if (credential) {
    //             const token = credential.accessToken;
    //             const user = result.user;
    //             console.log("Logged in with user: ", user.email)
    //         }
    //     }).catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         const email = error.email;
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         console.log("Error: ", errorMessage)
    //     });
    // }

    return <LoginComponent />;
}
export default Login;