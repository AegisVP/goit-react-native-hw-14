import React from 'react';
import { View } from 'react-native';
import { PostList } from '../components/PostList';
import { UserInfo } from '../components/UserInfo';

const PostsScreen = ({ posts, user }) => {
  return (
    <View style={{ flex: 1, alignItems: 'start', justifyContent: 'center' }}>
      <PostList listHeaderComponent={<UserInfo user={user} />} posts={posts} user={user} />
    </View>
  );
};

export default PostsScreen;
