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

    return <LoginComponent />;
}
export default Login;