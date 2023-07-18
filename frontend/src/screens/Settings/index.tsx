import React, { ReactElement } from 'react';
import Container from '../../components/common/Container';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { REGISTER } from '../../constants/routeNames';
import styles from './styles';
import { AuthContext } from '../../context/providers/authProvider';
import { auth } from '../../../firebase';

const Settings: () => ReactElement = () => {
    const authContext = React.useContext(AuthContext);
    console.log('authContext: ', authContext);
    return (
        <Container>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() =>
                    auth.signOut().then(() => {
                        authContext.dispatch({ type: "LOGOUT" })
                    })}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

export default Settings;
