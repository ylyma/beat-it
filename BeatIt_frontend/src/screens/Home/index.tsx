import React, {ReactElement} from 'react';
import {Text} from 'react-native';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';

const Home: () => ReactElement = () => {
  const [text, onChangeText] = React.useState('Useless Text');

  return (
    <Container>
      <Input onChangeText={onChangeText} value={text} />
      <Text>Home</Text>
    </Container>
  );
};

export default Home;
