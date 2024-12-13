import React from 'react';
import { Button } from 'react-native';
import { colors } from '../../styles/colors';

export const BackButton = ({ onPress, title }) => <Button onPress={onPress} title={title ? `< ${title}` : '< Back'} color={colors.text.link} />;
