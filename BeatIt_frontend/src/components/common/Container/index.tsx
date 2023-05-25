import React from 'react';
import * as reactNative from 'react-native';
import styles from './styles';

const Container = ({style, children, horizontalScroll, rowView}: any) => {
  return (
    <reactNative.ScrollView horizontal={horizontalScroll ? true : false}>
      <reactNative.View
        style={[
          styles.wrapper,
          style,
          {flexDirection: rowView ? 'row' : 'column'},
        ]}>
        {children}
      </reactNative.View>
    </reactNative.ScrollView>
  );
};

export default Container;
