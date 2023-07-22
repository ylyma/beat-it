import React from 'react';
import styles from './styles';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const AuthContainer = ({ style, children, horizontalScroll, rowView }: any) => {

    const { colors } = useTheme();

    return (

        <View
            style={[
                styles.wrapper,
                style,
                { flexDirection: rowView ? 'row' : 'column', backgroundColor: colors.white },
            ]}>
            {children}
        </View>

    );
};

export default AuthContainer;
