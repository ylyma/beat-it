import {useNavigation} from '@react-navigation/core';
import React, {ReactElement} from 'react';
import {View, Text} from 'react-native';

import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import styles from './styles';
import {LOGIN} from '../../constants/routeNames';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../assets/themes/colors';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const RegisterComponent: () => ReactElement = ({
  onSubmit,
  onChange,
  form,
  errors,
}) => {
  const {navigate} = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then(
      userCredential => {
        const user = userCredential.user;
        console.log('Registered with user: ', user.email);
      },
    );
  };
  return (
    <>
      <Container>
        <Text
          style={{
            marginTop: 50,
            alignSelf: 'center',
            color: colors.black,
            paddingBottom: 50,
          }}>
          LOGOplaceholder
        </Text>
        <View>
          <Text style={styles.title}>Create Account</Text>
          <Input
            label="Username"
            placeholder="Username"
            onChangeText={(value: any) => {
              onChange({name: 'username', value});
            }}
            error={errors.username}
          />
          <Input
            label="Email"
            placeholder="Email"
            error={errors.email}
            onChangeText={(value: any) => {
              onChange({name: 'email', value});
            }}
          />
          <Input
            label="Password"
            placeholder="Password"
            icon={<Text>SHOW</Text>}
            iconPosition="right"
            secureTextEntry={true}
            onChangeText={(value: any) => {
              onChange({name: 'password', value});
            }}
            error={errors.password}
          />
          <Input
            label="Confirm password"
            placeholder="Confirm password"
            icon={<Text>SHOW</Text>}
            iconPosition="right"
            secureTextEntry={true}
            onChangeText={(value: any) => {
              onChange({name: 'confirmPassword', value});
            }}
            error={errors.confirmPassword}
          />
        </View>

        <View style={{paddingTop: 10}}>
          <CustomButton
            primary
            title="Sign Up"
            onPress={() => {
              onSubmit;
              handleSignUp;
            }}
          />
          <TouchableOpacity>
            <Text style={[styles.textButton, {color: colors.black}]}>
              forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontal}>
          <Text style={styles.text}>already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigate(LOGIN);
            }}>
            <Text style={[styles.textButton, {color: colors.primary}]}>
              login
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </>
  );
};

export default RegisterComponent;
