import React from 'react';
import styles from './styles';
import { ScrollView, View } from 'react-native';
import MiniPlayer from '../MiniPlayer/MiniPlayer';
import { useTheme } from '@react-navigation/native';
import { ErrorBoundary } from 'react-error-boundary';

const Container = ({ style, children, horizontalScroll, rowView }: any) => {
    const colors = useTheme().colors;
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <View style={[styles.wrapper]}>
                <ScrollView
                    horizontal={horizontalScroll ? true : false}
                    style={styles.container}>
                    <View
                        style={[
                            styles.container,
                            style,
                            { flexDirection: rowView ? 'row' : 'column' },
                        ]}>
                        {children}
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <MiniPlayer />
                </View>
            </View>
        </ErrorBoundary>
    );
};

export default Container;
