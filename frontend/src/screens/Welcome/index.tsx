import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import colors from '../../assets/themes/colors';
import CustomButton from '../../components/common/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { LOGIN, REGISTER } from '../../constants/routeNames';
import styles from './styles';
import AuthContainer from '../../components/common/AuthContainer';

const Welcome: () => ReactElement = () => {
    const { navigate } = useNavigation();
    return (
        <AuthContainer>
            <View style={styles.top}>
                <Text
                    style={{
                        marginTop: 50,
                        alignSelf: 'center',
                        color: colors.black,
                        paddingBottom: 250,
                    }}>
                    LOGOplaceholder
                </Text>
                <Text style={styles.title}>Welcome!</Text>
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
        </AuthContainer>
    );
};

export default Welcome;
