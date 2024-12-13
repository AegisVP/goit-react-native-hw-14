import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = null;

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(userInfo, { payload }) {
      console.log('userSlice: setUserInfo:', { payload });
      console.log('userSlice: setUserInfo:', { userInfo });
      return payload;
    },
    clearUserInfo(userInfo) {
      console.log('userSlice: clearUserInfo:', { userInfo });
      return initialState;
    },
  },
});

const persistConfig = {
  key: 'userInfo',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, userSlice.reducer);
// export default userSlice.reducer;
export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const selectUserInfo = state => {
  console.log('selectUserInfo:', { state });
  return state.userInfo;
};
