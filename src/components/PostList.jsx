import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { PostCard } from './PostCard';
import { colors } from '../../styles/colors';

export const PostList = ({ posts, style: outerStyle = {}, listHeaderComponent: ListHeaderComponent }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard key={item.id} post={item} />}
      ListHeaderComponent={ListHeaderComponent}
      style={[style.postList, outerStyle]}
      contentContainerStyle={{ gap: 32 }}
    />
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
