import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostsScreen from '../screens/PostsScreen';
import PostScreen from '../screens/PostScreen';
import MapScreen from '../screens/MapScreen';
import { colors } from '../../styles/colors';
import { LogoutButton } from '../components/LogoutButton';

const Stack = createStackNavigator();

const PostsNavigator = ({ posts, user, doLogout }) => {
  return (
    <Stack.Navigator initialRouteName='Post List' screenOptions={{ headerStatusBarHeight: 44 }}>
      <Stack.Screen
        name='Post List'
        component={() => <PostsScreen user={user} posts={posts} />}
        options={{
          title: 'Posts',
          headerRight: () => <LogoutButton onPress={doLogout} />,
        }}
      />

      <Stack.Screen
        name='Post Details'
        component={PostScreen}
        options={({ route: { params } }) => ({
          headerRight: () => <LogoutButton onPress={doLogout} />,
          title: params.post.pictureName,
        })}
      />

      <Stack.Screen
        name='Post Map'
        component={MapScreen}
        options={({ route: { params } }) => ({
          headerRight: () => <LogoutButton onPress={doLogout} />,
          title: params.post.locality || params.post.pictureName,
        })}
      />
    </Stack.Navigator>
  );
};

export default PostsNavigator;
