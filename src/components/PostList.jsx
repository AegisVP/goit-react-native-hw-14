import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { PostCard } from './PostCard';
import { colors } from '../../styles/colors';

export const PostList = ({ posts, style: outerStyle = {}, listHeaderComponent: ListHeaderComponent }) => {
  return posts.length > 0 ? (
    <FlatList data={posts} renderItem={({ item }) => <PostCard key={item.id} post={item} />} style={[style.postList, outerStyle]} contentContainerStyle={{ gap: 32 }} />
  ) : (
    <Text style={{ paddingTop: 32 }}>No posts</Text>
  );
};

const style = StyleSheet.create({
  postList: {
    flex: 1,
    width: '100%',
    margin: 0,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: colors.backgroundMain,
  },
});
