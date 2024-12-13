import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = null;

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(_, { payload }) {
      return payload;
    },
    clearUserInfo() {
      return initialState;
    },
  },
});

const persistConfig = {
  key: 'userInfo',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, userSlice.reducer);
export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const selectUserInfo = state => state.userInfo;
