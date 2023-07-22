import React, { ReactElement } from 'react';
import { Text, View, Image } from 'react-native';
import colors from '../../assets/themes/colors';
import CustomButton from '../../components/common/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { LOGIN, REGISTER } from '../../constants/routeNames';
import styles from './styles';
import AuthContainer from '../../components/common/AuthContainer';
import globalStyles from '../../globalStyles/globalStyles';
import { useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/AuthStack';


const Welcome: () => ReactElement = () => {
    const { navigate } = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const colors = useTheme().colors;

    return (
        <AuthContainer>
            <View style={styles.top}>
                <Image style={globalStyles.logo} source={require('../../assets/images/BeatIt_Logo.png')} />

                <Text style={[styles.title, { color: colors.text }]}>
                    Welcome to{'\n'}     BeatIt!
                </Text>
            </View>

            <View style={styles.bottom}>
                <CustomButton
                    style={styles.button}
                    primary
                    title="Login"
                    onPress={() => {
                        navigate(LOGIN);
                    }}
                />
                <CustomButton
                    style={styles.button}
                    secondary
                    title="Sign Up"
                    onPress={() => {
                        navigate(REGISTER);
                    }}
                />
            </View>
        </AuthContainer >
    );
};

export default Welcome;
