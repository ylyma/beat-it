import React from 'react';
import styles from './styles';
import { ScrollView, View } from 'react-native';
import MiniPlayer from '../MiniPlayer/MiniPlayer';

const Container = ({ style, children, horizontalScroll, rowView }: any) => {
    return (
        <View style={styles.wrapper} >
            <ScrollView horizontal={horizontalScroll ? true : false} style={styles.container}>
                <View
                    style={[
                        styles.container,
                        style,
                        { flexDirection: rowView ? 'row' : 'column' },
                    ]}>
                    {children}
                </View>

            </ScrollView>
            <View
                style={styles.bottomContainer}
            >
                <MiniPlayer onPress={() => console.log('pressed')} />
            </View>
        </View >
    );
};

export default Container;
