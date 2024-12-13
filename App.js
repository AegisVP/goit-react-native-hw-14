import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import AuthNavigator from './src/navigation/AuthNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loadiing...</Text>} persistor={persistor}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
