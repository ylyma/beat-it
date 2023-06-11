import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { auth, googleAuth } from '../../../firebase';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import styles from './styles';
import {REGISTER, RESETPASSWORD} from '../../constants/routeNames';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
    signInWithRedirect
} from 'firebase/auth';

const LoginComponent: () => ReactElement = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const authContext = useContext(AuthContext);

    const navigation = useNavigation();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                authContext.dispatch({ type: 'LOGIN' });
                console.log(authContext)
            }
        });
    }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      const user = userCredential.user;
      console.log('Logged in with user: ', user.email);
    });
    return <HomeTab />;
  };

    const handleGoogleLogin = async () => {
        try {
            console.log('google login')
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            console.log('has play services')
            const { idToken } = await GoogleSignin.signIn();
            console.log('got id token')
            // Create a Google credential with the token
            const googleCredential = GoogleAuthProvider.credential(idToken);
            console.log('got google credential')

            // Sign-in the user with the credential
            return signInWithCredential(auth, googleCredential);
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('cancelled')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('in progress')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('play services not available')
            } else {
                // some other error happened
                console.log('other error')
            }
        }

    };

    const oldhandleGoogleLogin = async () => {
        console.log('google login')
        await signInWithRedirect(auth, googleAuth)
        console.log('redirected')
        const result = await getRedirectResult(auth)
        console.log(result)
        // .then(result => {
        //     const credential = GoogleAuthProvider.credentialFromResult(result!);
        //     if (credential) {
        //         const token = credential.accessToken;
        //         const user = result!.user;
        //         console.log('Logged in with user: ', user.email);
        //     }
        // })
        // .catch(error => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     const email = error.email;
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     console.log('Error: ', errorMessage);
        // });
    };

    const { navigate } = useNavigation();

  return (
    <View>
      <Container>
        <Text
          style={{
            marginTop: 50,
            alignSelf: 'center',
            color: colors.black,
            paddingBottom: 40,
          }}>
          LOGOplaceholder
        </Text>
        <View>
          <Text style={styles.title}>Welcome,</Text>

          <Text style={{alignSelf: 'center'}}>Please sign in to continue.</Text>

          <Input
            label="Email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="Email"
          />

          <Input
            label="Password"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            icon={<Text>SHOW</Text>}
            iconPosition="right"
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>

        <View style={{paddingTop: 10}}>
          <CustomButton primary title="Login" onPress={handleLogin} />
          <TouchableOpacity
            onPress={() => {
              navigate(RESETPASSWORD);
            }}>
            <Text style={[styles.textButton, {color: colors.black}]}>
              forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
      </Container>

      <View style={styles.footer}>
        <Text style={styles.text}>or, login with</Text>

                <View style={styles.horizontal}>
                    <TouchableOpacity onPress={handleGoogleLogin}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/googlelogo.png')}
                        />
                    </TouchableOpacity>
                </View>

        <View style={[styles.horizontal]}>
          <Text style={styles.text}>need a new account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigate(REGISTER);
            }}>
            <Text style={[styles.textButton, {color: colors.secondary}]}>
              sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginComponent;

