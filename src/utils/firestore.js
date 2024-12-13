import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config';
import { v4 as uuidv4 } from 'uuid';

// Функція для додавання документа до колекції
export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData, { merge: true });
    console.log('User added:', userId);
  } catch (error) {
    console.log('Error adding user:', error);
  }
};

export const addPost = async (userId, post) => {
  try {
    const res = await setDoc(doc(db, 'posts', userId), { ...post, id: uuidv4() }, { merge: true });
    console.log('Post added:', userId, res);
  } catch (error) {
    console.log('Error adding post:', error);
  }
};

export const getPosts = async () => {
  const posts = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    querySnapshot.forEach(doc => {
      posts.push(doc.data());
    });
  } catch (error) {
    console.log('Error getting posts:', error);
  } finally {
    return posts;
  }
};

// Функція для отримання документа з колекції
export const getUser = async userId => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('firestore: getUser: User data:', docSnap.data());
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    console.log('User data updated to Firestore:', uid);
  } catch (error) {
    console.log('Error saving user data to Firestore:', error);
  }
};
