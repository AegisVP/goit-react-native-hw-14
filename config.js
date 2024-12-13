// Для роботи із firebase обовʼязково треба ініціалізувати проект
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCvhT2EiV2hk6zwxLv8_KNCDm_i93OCkLw',
  authDomain: 'neoversity-33663.firebaseapp.com',
  projectId: 'neoversity-33663',
  storageBucket: 'neoversity-33663.appspot.com',
  // storageBucket: 'gs://neoversity-33663..firebaseapp.com', // у викладача адреса в такому форматі
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
export const db = getFirestore(app);
export const storage = getStorage(app);
