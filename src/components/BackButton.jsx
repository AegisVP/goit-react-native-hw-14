import React from 'react';
import { Button } from 'react-native';
import { colors } from '../../styles/colors';

export const BackButton = ({ onPress }) => <Button onPress={onPress} title='< Back' color={colors.text.link} />;
