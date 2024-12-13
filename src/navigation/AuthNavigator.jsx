import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import HomeNavigator from './HomeNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import { logoutDB } from '../utils/auth';
import { selectUserInfo, setUserInfo } from '../redux/userSlice';
import { getUser } from '../utils/firestore';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(store => {
    console.log('AuthNavigator: useSelector:', { store });
    return store.userInfo;
  });

  useEffect(() => {
    console.log('AuthNavigator: useEffect 1:', { userInfo });
    if (userInfo?.uid) {
      console.log('AuthNavigator: useEffect 1:', 'setting true');
      setIsLoggedin(true);
    } else {
      console.log('AuthNavigator: useEffect 1:', 'setting false');
      setIsLoggedin(false);
    }
  }, [userInfo]);

  useEffect(() => {
    console.log('AuthNavigator: useEffect 2:', { isLoggedin, userInfo });
    if (isLoggedin) {
      getUser(userInfo.uid)
        .then(data => {
          dispatch(setUserInfo(data));
          console.log('AuthNavigator: useEffect 2:', { fetchedUser: data });
        })
        .catch(() => setIsLoggedin(false));
    }
  }, [isLoggedin]);

  const doLogout = () => {
    logoutDB(dispatch).finally(() => setIsLoggedin(false));
  };

  return (
    <Stack.Navigator>
      {isLoggedin ? (
        <Stack.Screen name='Home' options={{ mode: 'card', headerMode: 'none' }}>
          {() => <HomeNavigator doLogout={doLogout} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name='Login' options={{ mode: 'card', headerMode: 'none' }}>
            {() => <LoginScreen setIsLoggedin={setIsLoggedin} />}
          </Stack.Screen>
          <Stack.Screen name='Register' options={{ mode: 'card', headerMode: 'none' }}>
            {() => <RegistrationScreen setIsLoggedin={setIsLoggedin} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
