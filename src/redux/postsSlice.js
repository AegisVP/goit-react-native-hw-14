import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(posts, { payload }) {
      return [...posts, payload];
    },
    deletePost(posts, { payload }) {
      return posts.filter(post => post.id !== payload);
    },
    setPosts(_, { payload }) {
      return payload;
    },
  },
});

export default postsSlice.reducer;
export const { addPost, deletePost, setPosts } = postsSlice.actions;
export const selectPosts = state => state.posts;
