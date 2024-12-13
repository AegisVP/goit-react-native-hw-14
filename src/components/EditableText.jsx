import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { Input } from './Input';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

export const EditableText = ({ value, onChange, style: outerStyle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleCancel = () => {
    setIsEditing(false);
    setLocalValue(value);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (localValue.trim() !== value) {
      onChange(String(localValue).trim());
    }
  };

  const startEditing = () => {
    setLocalValue(value);
    setIsEditing(true);
  };

  const SaveButton = () => (
    <>
      <Pressable onPress={handleSave} style={{ position: 'absolute', top: 12, right: 56 }}>
        <Ionicons name='save-outline' size={24} color={colors.black} />
      </Pressable>
      <Pressable onPress={handleCancel} style={{ position: 'absolute', top: 12, right: 16 }}>
        <Ionicons name='close-outline' size={24} color={colors.black} />
      </Pressable>
    </>
  );

  return (
    <View style={[{ alignItems: 'center' }, outerStyle]}>
      {isEditing ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ width: '100%' }}>
          <Input onBlur={Keyboard.dismiss} value={localValue} style={{ width: '100%' }} onChangeText={setLocalValue} rightButton={<SaveButton />} autofocus />
        </KeyboardAvoidingView>
      ) : (
        <Pressable onPress={startEditing}>
          <Text style={{ fontWeight: 500, fontSize: 30 }}>{localValue}</Text>
        </Pressable>
      )}
    </View>
  );
};
