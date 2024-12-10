import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

export const PostCard = ({ post, style: outerStyle = {}, metaLine: MetaLine }) => {
  const { navigate } = useNavigation();
  if (!post) return null;
  const { pictureUrl, pictureName, comments, locality } = post;

  const toMap = () => navigate('Post Map', { post });
  const toDetails = () => navigate('Post Details', { post });

  return (
    <Pressable style={[styles.container, outerStyle]}>
      {/* <Image source={{ uri: '../../assets/images/post1.jpg' }} style={styles.postImage} /> */}
      <Image source={{ uri: pictureUrl }} style={styles.postImage} />
      {/* <Image source={require(`../../assets/images/${image}`)} style={styles.postImage} /> */}
      {/* <Image source={require('../../assets/images/post1.jpg')} style={styles.postImage} /> */}
      <Text style={styles.postTitle}>{pictureName}</Text>
      {MetaLine ? (
        <MetaLine />
      ) : (
        <View style={styles.postMeta}>
          <Pressable onPress={toDetails} style={[styles.postDescription, { color: comments.length > 0 ? colors.default : colors.text.secondary }]}>
            <Ionicons name='chatbubbles-outline' size={16} />
            <Text>{comments.length}</Text>
          </Pressable>
          {locality && (
            <Pressable onPress={toMap} style={[styles.postDescription, { flexDirection: 'row' }]}>
              <Ionicons name='location-outline' size={16} />
              <Text style={{ color: colors.text.default, textDecorationLine: 'underline' }}>{locality}</Text>
            </Pressable>
          )}
        </View>
      )}
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  container: {
    maxHeight: 299,
    paddingBottom: 12,
    overflow: 'hidden',
    flex: 1,
    borderRadius: 12,
    boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.1)',
  },
  postImage: {
    width: '100%',
    height: 225,
    resizeMode: 'cover',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.text.default,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  postDescription: {
    fontSize: 16,
    gap: 4,
    fontWeight: 400,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 8,
  },
});
