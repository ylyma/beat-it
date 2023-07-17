import {Button, StyleSheet, Text, View} from 'react-native';

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../components/common/Container';
import Modal from '../../components/common/Modal';
import styles from './styles';

const PlaylistTitle: () => ReactElement = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  return (
    <Container>
      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={handleModal} />
        </View>
      </Modal>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="LogRocket is fab!" />
          <Modal.Body>
            <Text style={styles.text}>Agree to continue with this guide</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button title="I agree" onPress={handleModal} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </Container>
  );
};

export default PlaylistTitle;
