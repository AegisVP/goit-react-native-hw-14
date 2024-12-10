import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { style } from '../../styles/general';

export const ShowPasswordButton = ({ securePassEntry, setSecurePassEntry }) => (
  <TouchableOpacity onPress={() => setSecurePassEntry(p => !p)}>
    <Text style={style.showPassText}>{securePassEntry ? 'Show' : 'Hide'} password</Text>
  </TouchableOpacity>
);
