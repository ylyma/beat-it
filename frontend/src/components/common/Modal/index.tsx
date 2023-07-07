import React, {ReactNode} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import RNModal from 'react-native-modal';
import styles from './styles';

type ModalProps = {isVisible: boolean; children: ReactNode; [x: string]: any};

const Modal = ({isVisible = false, children, ...props}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({children}: {children: React.ReactNode}) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({title}: {title: string}) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const ModalBody = ({children}: {children?: React.ReactNode}) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({children}: {children?: React.ReactNode}) => (
  <View style={styles.footer}>{children}</View>
);

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
