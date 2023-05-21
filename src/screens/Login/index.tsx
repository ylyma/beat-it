
import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
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

const Login: () => ReactElement = () => {
  const [text, onChangeText] = React.useState('');
    
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

    const handleGoogleLogin = () => {
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
    }

  return (
    <Container>
      <Container>
        <Input
          label="Username"
          onChangeText={onChangeText}
          value={text}
          //error={'This field is required'}
        />

        <Input
          label="Password"
          onChangeText={onChangeText}
          value={text}
          icon={<Text>HIDE</Text>}
          iconPosition="right"
          error={'This field is required'}
        />
        <CustomButton primary title="Login" />
        <CustomButton nofill title="forgot your password?" />
      </Container>

      <Container>
        <Text style={{paddingBottom: 10}}>or, login with</Text>

        <View style={{flexDirection: 'row'}}>
          <CustomButton icon={<Text>placeholder</Text>} />
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
