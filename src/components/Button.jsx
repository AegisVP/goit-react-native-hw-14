import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export const Button = props => {
  const { children, onPress, outerStyle } = props;

  return (
    <TouchableOpacity style={[style.button, outerStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    backgroundColor: colors.button.default.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
