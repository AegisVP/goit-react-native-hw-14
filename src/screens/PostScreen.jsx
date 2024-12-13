import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles as postStyles } from '../components/PostCard';
import { Input } from '../components/Input';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const PostScreen = ({ route: { params } }) => {
  const { comments, pictureUrl } = params.post;
  const [comment, setComment] = useState('');

  const doSendComment = () => {
    // TODO: Send comment
    console.log('Send comment "', comment, '"');

    setComment('');
    Keyboard.dismiss();
  };

  const SendButton = () => {
    return (
      <Pressable
        onPress={doSendComment}
        style={{ justifyContent: 'center', alignItems: 'center', width: 34, height: 34, borderRadius: 17, backgroundColor: colors.accent, position: 'absolute', top: 8, right: 8 }}>
        <Ionicons name='arrow-up' size={24} color={colors.white} />
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16, paddingTop: 32 }}>
        <Pressable onPress={() => Keyboard.dismiss()} style={{ gap: 32, paddingBottom: 82 }}>
          <Image source={{ uri: pictureUrl }} style={[postStyles.postImage, { borderRadius: 12 }]} />
          {comments?.length > 0 && (
            <View style={{ gap: 16, direction: 'column' }}>
              {comments?.map(({ id, comment, dateTime }, idx) => (
                <View key={id} style={[styles.commentBlock, { alignSelf: idx % 2 === 0 ? 'flex-end' : 'flex-start' }]}>
                  <Text>{comment}</Text>
                  <Text style={{ color: colors.text.secondary, textAlign: idx % 2 === 0 ? 'right' : 'left' }}>{dateTime}</Text>
                </View>
              ))}
            </View>
          )}
        </Pressable>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} keyboardVerticalOffset={88} style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}>
        <Input placeholder='Leave a comment...' value={comment} onChangeText={setComment} outerStyles={{ borderRadius: 25 }} rightButton={<SendButton />} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  commentBlock: {
    gap: 8,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    width: '85%',
    borderRadius: 12,
    color: colors.text.default,
  },
});

export default PostScreen;
