import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import Input from '../common/Input';
import styles from './styles';
import { LOGIN } from '../../constants/routeNames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../assets/themes/colors';
import globalStyles from '../../globalStyles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ResetPasswordComponent: () => ReactElement = ({
    onSubmit,
    onChange,
    form,
    errors,
}) => {
    const { navigate } = useNavigation();
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    return (

        <Container>
            <Image style={globalStyles.logo} source={require('../../assets/images/BeatIt_Logo.png')} />
            <View style={styles.container}>
                <Text style={styles.title}>Reset Password</Text>
                <Input
                    label="Password"
                    placeholder="Password"
                    icon={<Ionicons name="eye" size={20} onPress={toggleSecureEntry} />}
                    iconPosition="right"
                    secureTextEntry={secureTextEntry}
                    onChangeText={(value: any) => {
                        onChange({ name: 'password', value });
                    }}
                    error={errors.password}
                />
                <Input
                    label="Confirm password"
                    placeholder="Confirm password"
                    icon={<Ionicons name="eye" size={20} onPress={toggleSecureEntry} />}
                    iconPosition="right"
                    secureTextEntry={secureTextEntry}
                    onChangeText={(value: any) => {
                        onChange({ name: 'confirmPassword', value });
                    }}
                    error={errors.confirmPassword}

                />
            </View>

            <View style={styles.container}>
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

    );
};

export default ResetPasswordComponent;
