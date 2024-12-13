import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import postReducer from './postsSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  userInfo: userReducer,
  posts: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: def => def({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
});

export const persistor = persistStore(store);
