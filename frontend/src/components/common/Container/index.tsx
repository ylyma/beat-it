import React from 'react';
import styles from './styles';
import {ScrollView, View} from 'react-native';
import MiniPlayer from '../MiniPlayer/MiniPlayer';

const Container = ({style, children}: any) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={[styles.container, style]}>{children}</View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <MiniPlayer />
      </View>
    </View>
  );
};

export default Container;
