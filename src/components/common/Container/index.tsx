import React from 'react';
import * as reactNative from 'react-native';
import styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Container = ({}) => {
  return (
    <reactNative.ScrollView>
      <reactNative.View style={styles.wrapper} />
    </reactNative.ScrollView>
  );
};
