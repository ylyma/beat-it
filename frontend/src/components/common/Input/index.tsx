import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import colors from '../../../assets/themes/colors';

const Input = ({
  text,
  icon,
  iconPosition,
  onChangeText,
  style,
  label,
  error,
  ...props
}: any) => {
  const [focused, setFocused] = useState<boolean>(false);

  const getFlexDirection = () => {
    if (icon && iconPosition === 'left') {
      return 'row';
    } else if (icon && iconPosition === 'right') {
      return 'row-reverse';
    }
  };

  const getBorderColor = () => {
    if (error) {
      return colors.failure;
    }
    if (focused) {
      return colors.accent;
    } else {
      return colors.grey;
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {
            borderColor: getBorderColor(),
            flexDirection: getFlexDirection(),
          },
        ]}>
        <View style={styles.icon}>{icon && icon}</View>

        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={text}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
