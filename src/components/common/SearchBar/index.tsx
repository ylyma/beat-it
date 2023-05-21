import React from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';

const SearchBar = ({text, onChangeText, style, label}: any) => {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <TextInput
        style={[styles.wrapper, style]}
        onChangeText={onChangeText}
        value={text}
        placeholder="useless placeholder"
      />
    </View>
  );
};

export default SearchBar;
