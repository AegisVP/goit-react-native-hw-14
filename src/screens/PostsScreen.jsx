import React from 'react';
import { View } from 'react-native';
import { PostList } from '../components/PostList';
import { UserInfo } from '../components/UserInfo';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../redux/userSlice';
import { selectPosts } from '../redux/postsSlice';

const PostsScreen = ({ posts }) => {
  const userInfo = useSelector(selectUserInfo);
  // const posts = useSelector(selectPosts);

  return (
    <View style={{ flex: 1, alignItems: 'start', justifyContent: 'center' }}>
      <PostList listHeaderComponent={<UserInfo user={userInfo} />} posts={posts} />
    </View>
  );
};

export default PostsScreen;
