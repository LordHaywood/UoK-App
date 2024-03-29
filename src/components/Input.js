import React from 'react';
import { TextInput } from 'react-native';

export const Input = ({ value, onChangeText, placeholder, secureTextEntry, style, multiline, numberOfLines, keyboardType }) => {
  return (
    <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize={'none'}
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputStyle, style]}
        keyboardType={keyboardType}
        underlineColorAndroid='transparent'
    />
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    fontSize: 16,
    borderWidth: 1,  // size/width of the border
    borderColor: 'lightgrey',  // color of the border
    height: 40,
    borderRadius: 5,
    padding: 5
  }
};
