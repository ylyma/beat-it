import React from 'react';
import styles from './styles';
import { ScrollView, View } from 'react-native';
import MiniPlayer from '../MiniPlayer/MiniPlayer';

const AuthContainer = ({ style, children, horizontalScroll, rowView }: any) => {
    return (
        <ScrollView horizontal={horizontalScroll ? true : false}>
            <View
                style={[
                    styles.wrapper,
                    style,
                    { flexDirection: rowView ? 'row' : 'column' },
                ]}>
                {children}
            </View>
        </ScrollView>
    );
};

export default AuthContainer;
