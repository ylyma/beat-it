import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { View, Text, Image, ToastAndroid } from 'react-native';
import { auth, googleAuth } from '../../../firebase';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import styles from './styles';
import { REGISTER, RESETPASSWORD } from '../../constants/routeNames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/themes/colors';
import HomeTab from '../../navigations/HomeTab';
import AuthContainer from '../common/AuthContainer';
import { AuthContext } from '../../context/providers/authProvider';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {
    GoogleAuthProvider,
    getRedirectResult,
    onAuthStateChanged,
    signInWithCredential,
    signInWithEmailAndPassword,
    signInWithRedirect,
} from 'firebase/auth';
import globalStyles from '../../globalStyles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/AuthStack';
import { useTheme } from '@react-navigation/native';

const LoginComponent: () => ReactElement = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const authContext = useContext(AuthContext);
    const { colors } = useTheme();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log('user: ', user);
                authContext.dispatch({ type: 'LOGIN', payload: user });
            }
        });
    }, []);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Logged in with user: ', user.email);
            })
            .catch(error => {
                console.log('Error logging in: ', error);
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            });
    };

    const handleGoogleLogin = async () => {
        try {
            console.log('google login');
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            console.log('has play services');
            const { idToken } = await GoogleSignin.signIn();
            console.log('got id token');
            // Create a Google credential with the token
            const googleCredential = GoogleAuthProvider.credential(idToken);
            console.log('got google credential');

            // Sign-in the user with the credential
            return signInWithCredential(auth, googleCredential);
        } catch (error: any) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('play services not available');
            } else {
                // some other error happened
                console.log('other error');
            }
        }
    };

    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const { navigate } = useNavigation<StackNavigationProp<AuthStackParamList>>();

    return (
        <AuthContainer>
            <Image
                style={globalStyles.logo}
                source={require('../../assets/images/BeatIt_Logo.png')}
            />
            <View>
                <Text style={[styles.title, { color: colors.text }]}>Welcome,</Text>

                <Text style={{ alignSelf: 'center', color: colors.secondaryText }}>
                    Please sign in to continue.
                </Text>

                <Input
                    label="Email"
                    onChangeText={(text: string) => setEmail(text)}
                    placeholderTextColor={colors.text}
                    value={email}
                    placeholder="Email"
                />

                <Input
                    label="Password"
                    onChangeText={(text: string) => setPassword(text)}
                    value={password}
                    placeholderTextColor={colors.text}

                    icon={<Ionicons name="eye" size={20} onPress={toggleSecureEntry} />}
                    iconPosition="right"
                    secureTextEntry={secureTextEntry}
                    placeholder="Password"
                    onSubmitEditing={handleLogin}
                />
            </View>

            <View style={{ paddingTop: 10 }}>
                <CustomButton primary title="Login" onPress={handleLogin} />
                <TouchableOpacity
                    onPress={() => {
                        navigate(RESETPASSWORD);
                    }}>
                    <Text style={[styles.textButton, { color: colors.text }]}>
                        forgot your password?
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={[styles.text, { color: colors.secondaryText }]}>
                    or, login with
                </Text>

                <View style={styles.horizontal}>
                    <TouchableOpacity onPress={handleGoogleLogin}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/googlelogo.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[styles.horizontal]}>
                    <Text style={[styles.text, { color: colors.secondaryText }]}>
                        need a new account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate(REGISTER);
                        }}>
                        <Text style={[styles.textButton, { color: colors.secondaryText }]}>
                            sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthContainer>
    );
};

export default LoginComponent;
