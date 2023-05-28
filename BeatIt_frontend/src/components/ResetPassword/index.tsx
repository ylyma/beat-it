import {useNavigation} from '@react-navigation/core';
import React, {ReactElement, useState} from 'react';
import {View, Text} from 'react-native';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import styles from './styles';
import {LOGIN} from '../../constants/routeNames';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../assets/themes/colors';

const ResetPasswordComponent: () => ReactElement = ({
  onSubmit,
  onChange,
  form,
  errors,
}) => {
  const {navigate} = useNavigation();
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
          <Text style={styles.title}>Reset Password</Text>
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
            title="Reset"
            onPress={() => {
              onSubmit();
              navigate(LOGIN);
            }}
          />
          <CustomButton
            secondary
            title="Cancel"
            onPress={() => {
              navigate(LOGIN);
            }}
          />
        </View>
      </Container>
    </>
  );
};

export default ResetPasswordComponent;
