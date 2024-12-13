import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { PostList } from '../components/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, setPosts } from '../redux/postsSlice';
import { getPosts } from '../utils/firestore';
import { colors } from '../../styles/colors';

const PostsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    if (!firstLoad) {
      console.log('PostsScreen: useEffect:', 'Not first load');
      return;
    }

    console.log('PostsScreen: useEffect:', 'First load');
    (async () => {
      console.log('PostsScreen: useEffect:', 'async start');
      let newPosts = [];
      setIsLoading(true);
      setErrorLoading('');
      try {
        newPosts = await getPosts();
        console.log('PostsScreen: useEffect:', { newPosts });
        console.log('PostsScreen: useEffect:', { geolocation: newPosts[0].geolocation });
        setFilteredPosts(newPosts);
        dispatch(setPosts(newPosts));
      } catch (error) {
        console.log('Error getting posts:', error);
        setErrorLoading('Error loading posts');
      } finally {
        setIsLoading(false);
        setFirstLoad(false);
      }
    })();
    console.log('PostsScreen: useEffect:', 'all done');
  }, [posts]);

  console.log({ filteredPosts, posts });

  return (
    <View style={{ flex: 1, direction: 'column', alignItems: 'center', justifyContent: 'start' }}>
      {isLoading ? (
        <Text style={{ paddingTop: 32 }}>Loading...</Text>
      ) : errorLoading ? (
        <>
          <Text style={{ paddingTop: 32, fontSize: 18, color: colors.text.error }}>{errorLoading}</Text>
          <Pressable onPress={() => setFirstLoad(true)} style={{ paddingTop: 12, fontSize: 20, color: 'blue' }}>
            <Text>Try again</Text>
          </Pressable>
        </>
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </View>
  );
};

export default PostsScreen;
