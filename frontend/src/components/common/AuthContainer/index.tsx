import React from 'react';
import styles from './styles';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ErrorBoundary } from "react-error-boundary";

const AuthContainer = ({ style, children, horizontalScroll, rowView }: any) => {

    const { colors } = useTheme();

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <View
                style={[
                    styles.wrapper,
                    style,
                    { flexDirection: rowView ? 'row' : 'column', backgroundColor: colors.white },
                ]}>
                {children}
            </View>
        </ErrorBoundary>

    );
};

export default AuthContainer;
