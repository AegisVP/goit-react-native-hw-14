import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    writePost(state, { payload }) {
      state = { posts: [...posts, payload] };
    },
    deletePost(state, { payload }) {
      state = { ...state, posts: posts.filter(post => post.id !== payload) };
    },
    // addComment({posts}, action) {
    //   return posts.map(post => (post.id === action.payload.id ? action.payload : post));
    // },
  },
});

export default postsSlice.reducer;
export const { writePost, deletePost } = postsSlice.actions;
export const selectPosts = ({ posts }) => posts;
