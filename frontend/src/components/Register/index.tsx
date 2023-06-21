import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useState } from 'react';
<<<<<<< HEAD
import { View, Text } from 'react-native';
=======
import { View, Text, Image } from 'react-native';
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import styles from './styles';
import { LOGIN } from '../../constants/routeNames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/themes/colors';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';
import AuthContainer from '../common/AuthContainer';
import globalStyles from '../../globalStyles/globalStyles';

const RegisterComponent: () => ReactElement = ({
    onSubmit,
    onChange,
    form,
    errors,
}) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { navigate } = useNavigation();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                const update = {
                    displayName: username,
                    photo: null,
                };
                updateProfile(user, update);
                console.log('Registered with user: ', user.email);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
            });
    };
    return (
        <View>
            <AuthContainer>
                <Image style={globalStyles.logo} source={require('../../assets/images/BeatIt_Logo.png')} />
                <View>
                    <Text style={styles.title}>Create Account</Text>
                    <Input
                        label="Username"
                        placeholder="Username"
                        onChangeText={(value: string) => {
                            onChange({ name: 'username', value });
                            setUsername(value);
                        }}
                        error={errors.username}
                        value={username}
                    />
                    <Input
                        label="Email"
                        placeholder="Email"
                        onChangeText={(value: string) => {
                            onChange({ name: 'email', value });
                            setEmail(value);
                        }}
                        error={errors.email}
                        value={email}
                    />
                    <Input
                        label="Password"
                        placeholder="Password"
                        icon={<Text>SHOW</Text>}
                        iconPosition="right"
                        secureTextEntry={true}
                        onChangeText={(value: any) => {
                            onChange({ name: 'password', value });
                            setPassword(value);
                        }}
                        error={errors.password}
                        value={password}
                    />
                    <Input
                        label="Confirm password"
                        placeholder="Confirm password"
                        icon={<Text>SHOW</Text>}
                        iconPosition="right"
                        secureTextEntry={true}
                        onChangeText={(value: any) => {
                            onChange({ name: 'confirmPassword', value });
                        }}
                        error={errors.confirmPassword}
                    />
                </View>

                <View style={{ paddingTop: 10 }}>
                    <CustomButton
                        secondary
                        title="Sign Up"
                        onPress={() => {
                            onSubmit();
                            handleSignUp();
                        }}
                    />
                </View>

                <View style={styles.horizontal}>
                    <Text style={styles.text}>already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate(LOGIN);
                        }}>
                        <Text style={[styles.textButton, { color: colors.primary }]}>
                            login
                        </Text>
                    </TouchableOpacity>
                </View>
            </AuthContainer>
        </View>
    );
};

export default RegisterComponent;
