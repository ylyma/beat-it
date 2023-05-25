/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import styles from './styles';
import colors from '../../../assets/themes/colors';

const CustomButton = ({
    title,
    icon,
    nofill,
    primary,
    secondary,
    failure,
    loading,
    disabled,
    ...props
}: any) => {
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
            style={[styles.wrapper, { backgroundColor: getBackgroundColor() }]}
            disabled={disabled}
            {...props}>
            <View style={[styles.loading]}>
                {loading && <ActivityIndicator />}
                {title && (
                    <Text
                        style={{
                            color: disabled || nofill ? colors.black : colors.white,
                            paddingLeft: loading ? 5 : 0,
                            textDecorationLine: nofill ? 'underline' : 'none',
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
