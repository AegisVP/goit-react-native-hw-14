import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostsScreen from '../screens/PostsScreen';
import PostScreen from '../screens/PostScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

const PostsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Post List' screenOptions={{ headerStatusBarHeight: 44 }}>
      <Stack.Screen name='Post List' component={PostsScreen} options={{ title: 'Posts' }} />
      <Stack.Screen name='Post Details' component={PostScreen} options={({ route: { params } }) => ({ title: params.post.pictureName })} />
      <Stack.Screen name='Post Map' component={MapScreen} options={({ route: { params } }) => ({ title: params.post.locality || params.post.pictureName })} />
    </Stack.Navigator>
  );
};

export default PostsNavigator;
