/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import styles from './styles';
import colors from '../../../assets/themes/colors';
import { useTheme } from '@react-navigation/native';

const CustomButton = ({
    title,
    icon,
    primary,
    secondary,
    failure,
    loading,
    disabled,
    style,
    ...props
}: any) => {
    const { dark, colors } = useTheme();
    const getBackgroundColor = () => {
        if (icon) {
            return colors.white;
        }
        if (disabled) {
            return colors.grey;
        }
        if (primary) {
            return colors.primary;
        } else if (failure) {
            return colors.failure;
        } else if (secondary) {
            return colors.secondary;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.wrapper, style, { backgroundColor: getBackgroundColor() }]}
            disabled={disabled}
            {...props}>
            <View style={[styles.loading]}>
                {loading && <ActivityIndicator />}
                {title && (
                    <Text
                        style={{
                            color: colors.alwayswhite,
                            paddingLeft: loading ? 5 : 0,
                            fontWeight: 'bold',
                        }}>
                        {title}
                    </Text>
                )}
                <View>{icon && icon}</View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;
