import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

export const LogoutButton = ({ onPress, style: outerStyle, iconProps }) => (
  <TouchableOpacity onPress={onPress} style={[{ padding: 10 }, outerStyle]}>
    <Ionicons name='log-out-outline' size={24} color={colors.text.default} {...iconProps} />
  </TouchableOpacity>
);
