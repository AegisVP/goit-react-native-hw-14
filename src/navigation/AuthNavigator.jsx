import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeNavigator from './HomeNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();
const STORAGE_KEY = 'isLoggedIn';

const AuthNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const readUserAuthFromStorage = async () => {
    const val = await AsyncStorage.getItem(STORAGE_KEY);
    setIsLoading(false);
    return String(val).toLocaleLowerCase() == 'true';
  };

  const writeUserAuthToStorage = async val => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, String(val));
    } catch (e) {
      console.log('Unable to set storage value');
    }
  };

  useEffect(() => {
    void readUserAuthFromStorage().then(setIsLoggedin);
  }, []);

  const doLogin = (username, password) => {
    setIsLoggedin(true);
    writeUserAuthToStorage(true);
  };

  const doRegister = () => {
    setIsLoggedin(true);
    writeUserAuthToStorage(true);
  };

  const doLogout = () => {
    setIsLoggedin(false);
    writeUserAuthToStorage(false);
  };

  return isLoading ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <Stack.Navigator>
      {isLoggedin ? (
        <Stack.Screen name='Home' options={{ mode: 'card', headerMode: 'none' }}>
          {() => <HomeNavigator doLogout={doLogout} isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name='Login' options={{ mode: 'card', headerMode: 'none' }}>
            {() => <LoginScreen doLogin={doLogin} setIsLoggedin={setIsLoggedin} />}
          </Stack.Screen>
          <Stack.Screen name='Register' options={{ mode: 'card', headerMode: 'none' }}>
            {() => <RegistrationScreen doRegister={doRegister} setIsLoggedin={setIsLoggedin} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
