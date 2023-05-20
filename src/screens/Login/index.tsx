import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import CustomButton from '../../components/common/CustomButton';

const Login: () => ReactElement = () => {
  const [text, onChangeText] = React.useState('');

  return (
    <Container>
      <Container>
        <Input
          label="Username"
          onChangeText={onChangeText}
          value={text}
          //error={'This field is required'}
        />

        <Input
          label="Password"
          onChangeText={onChangeText}
          value={text}
          icon={<Text>HIDE</Text>}
          iconPosition="right"
          error={'This field is required'}
        />
        <CustomButton primary title="Login" />
        <CustomButton nofill title="forgot your password?" />
      </Container>

      <Container>
        <Text style={{paddingBottom: 10}}>or, login with</Text>

        <View style={{flexDirection: 'row'}}>
          <CustomButton icon={<Text>placeholder</Text>} />
        </View>
      </Container>
    </Container>
  );
};

export default Login;
