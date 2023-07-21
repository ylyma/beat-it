import React, {ReactElement} from 'react';
import Container from '../../components/common/Container';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import {REGISTER} from '../../constants/routeNames';
import styles from './styles';
import {AuthContext} from '../../context/providers/authProvider';
import {auth} from '../../../firebase';
import {useTheme} from '@react-navigation/native';

const Settings: () => ReactElement = () => {
  const authContext = React.useContext(AuthContext);
  const colors = useTheme().colors;
  console.log('authContext: ', authContext);
  return (
    <Container>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.secondary}]}
          onPress={() =>
            auth.signOut().then(() => {
              authContext.dispatch({type: 'LOGOUT'});
            })
          }>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Settings;
