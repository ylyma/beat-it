import {useNavigation} from '@react-navigation/core';
import React, {ReactElement, useState} from 'react';
import {View, Text, Image, ToastAndroid} from 'react-native';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import styles from './styles';
import {LOGIN} from '../../constants/routeNames';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {auth} from '../../../firebase';
import AuthContainer from '../common/AuthContainer';
import globalStyles from '../../globalStyles/globalStyles';
import {useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/AuthStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onSubmit: any;
  onChange: any;
  form: any;
  errors: any;
};

const RegisterComponent: (props: Props) => ReactElement = ({
  onSubmit,
  onChange,
  form,
  errors,
}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const {navigate} = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const colors = useTheme().colors;
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const update = {
          displayName: username,
          photo: null,
        };
        updateProfile(user, update);
        console.log('Registered with user: ', user.email);
        ToastAndroid.show(
          'Registered with user: ' + user.email,
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.SHORT,
          );
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.SHORT,
          );
        } else if (error.code === 'auth/weak-password') {
          ToastAndroid.show(
            'Password should be at least 6 characters',
            ToastAndroid.SHORT,
          );
        } else {
          console.error(error);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      });
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Signed in with user: ', user.email);
        ToastAndroid.show(
          'Signed in with user: ' + user.email,
          ToastAndroid.SHORT,
        );
        navigate(LOGIN);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.SHORT,
          );
        } else if (error.code === 'auth/user-disabled') {
          console.log('That email address is disabled!');
          ToastAndroid.show(
            'That email address is disabled!',
            ToastAndroid.SHORT,
          );
        } else if (error.code === 'auth/user-not-found') {
          console.log('That email address is not found!');
          ToastAndroid.show(
            'That email address is not found!',
            ToastAndroid.SHORT,
          );
        } else if (error.code === 'auth/wrong-password') {
          console.log('That password is incorrect!');
          ToastAndroid.show('That password is incorrect!', ToastAndroid.SHORT);
        } else {
          console.error(error);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      });
  };
  return (
    <AuthContainer>
      <Image
        style={globalStyles.logo}
        source={require('../../assets/images/BeatIt_Logo.png')}
      />
      <View>
        <Text style={styles.title}>Create Account</Text>
        <Input
          label="Username"
          placeholder="Username"
          placeholderTextColor={colors.text}
          onChangeText={(value: string) => {
            onChange({name: 'username', value});
            setUsername(value);
          }}
          error={errors.username}
          value={username}
        />
        <Input
          label="Email"
          placeholder="Email"
          placeholderTextColor={colors.text}
          onChangeText={(value: string) => {
            onChange({name: 'email', value});
            setEmail(value);
          }}
          error={errors.email}
          value={email}
        />
        <Input
          label="Password"
          placeholder="Password"
          icon={<Ionicons name="eye" size={20} onPress={toggleSecureEntry} />}
          placeholderTextColor={colors.text}
          iconPosition="right"
          secureTextEntry={secureTextEntry}
          onChangeText={(value: any) => {
            onChange({name: 'password', value});
            setPassword(value);
          }}
          error={errors.password}
          value={password}
        />
        <Input
          label="Confirm password"
          placeholder="Confirm password"
          icon={<Ionicons name="eye" size={20} onPress={toggleSecureEntry} />}
          placeholderTextColor={colors.text}
          iconPosition="right"
          secureTextEntry={secureTextEntry}
          onChangeText={(value: any) => {
            onChange({name: 'confirmPassword', value});
            setConfirmPassword(value);
          }}
          error={errors.confirmPassword}
          value={confirmPassword}
        />
      </View>

      <View style={{paddingTop: 10}}>
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
        <Text style={[styles.text, {color: colors.secondaryText}]}>
          already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigate(LOGIN);
          }}>
          <Text style={[styles.textButton, {color: colors.primary}]}>
            login
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RegisterComponent;
