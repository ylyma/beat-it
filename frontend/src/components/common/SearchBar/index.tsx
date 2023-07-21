import React from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import {useTheme} from '@react-navigation/native';

const SearchBar = ({
  text,
  icon,
  iconPosition,
  onChangeText,
  style,
  label,
  error,
  ...props
}: any) => {
  const [focused, setFocused] = React.useState(false);
  const colors = useTheme().colors;

  const getFlexDirection = () => {
    if (icon && iconPosition === 'left') {
      return 'row';
    } else if (icon && iconPosition === 'right') {
      return 'row-reverse';
    }
  };

  const getFillColor = () => {
    if (focused) {
      return colors.otherlight;
    } else {
      return colors.otherdark;
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={[styles.label]}>{label}</Text>}

      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {elevation: focused ? 5 : 0},
          {
            backgroundColor: getFillColor(),
            flexDirection: getFlexDirection(),
          },
        ]}>
        <View style={styles.icon}>{icon && icon}</View>

        <TextInput
          style={[styles.textInput, style, {color: colors.background}]}
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

export default SearchBar;
