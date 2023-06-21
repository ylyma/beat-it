import React, { ReactElement } from 'react';
<<<<<<< HEAD
import { Text, View } from 'react-native';
=======
import { Text, View, Image } from 'react-native';
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c
import colors from '../../assets/themes/colors';
import CustomButton from '../../components/common/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { LOGIN, REGISTER } from '../../constants/routeNames';
import styles from './styles';
import AuthContainer from '../../components/common/AuthContainer';
<<<<<<< HEAD
=======
import globalStyles from '../../globalStyles/globalStyles';
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c

const Welcome: () => ReactElement = () => {
    const { navigate } = useNavigation();
    return (
        <AuthContainer>
            <View style={styles.top}>
<<<<<<< HEAD
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

=======
                <Image style={globalStyles.logo} source={require('../../assets/images/BeatIt_Logo.png')} />

                <Text style={styles.title}>
                    Welcome to{'\n'}     BeatIt!
                </Text>
            </View>

>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c
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
<<<<<<< HEAD
        </AuthContainer>
=======
        </AuthContainer >
>>>>>>> 9ed3ed3789d0e5916f6b39e86fa28f673e578e9c
    );
};

export default Welcome;
