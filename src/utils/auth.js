import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../../config';
import { clearUserInfo } from '../redux/userSlice';
import { addUser, getUser } from './firestore';

export const registerDB = async ({ displayName, email, password }) => {
  let credentials = null;
  try {
    credentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.log('SIGNUP ERROR:', error);
    return;
  }

  if (credentials?._tokenResponse?.email !== email || !credentials.user) {
    return;
  }

  const user = credentials.user;

  try {
    void addUser(user.uid, {
      uid: user.uid,
      email: user.email || '',
      displayName: displayName || '',
      profilePhoto: '',
    });
  } catch (error) {
    console.log('USER CREATION ERROR:', error);
  }

  return user;
};

export const loginDB = async ({ email, password }) => {
  let credentials = null;
  try {
    credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.log('LOGIN ERROR:', error);
    return;
  }

  if (credentials?._tokenResponse?.email !== email || credentials?._tokenResponse?.registered !== true || !credentials.user) {
    return;
  }

  const userInfo = credentials.user;
  let fetchedUser;
  try {
    fetchedUser = await getUser(userInfo.uid);
  } catch (error) {
    console.log('USER FETCH ERROR:', error);
  }

  userInfo.uid = fetchedUser.uid;
  userInfo.displayName = fetchedUser.displayName;
  userInfo.profilePhoto = fetchedUser.profilePhoto;

  return userInfo;
};

// Функція для логауту
export const logoutDB = async () => {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.log('LOGOUT ERROR:', error);
  }
};

// Оновлення профілю користувача
export const updateUserProfile = async update => {
  const user = firebaseAuth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
