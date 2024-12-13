import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles/colors';
import { LogoutButton } from '../components/LogoutButton';
import { BackButton } from '../components/BackButton';
import PostsNavigator from './PostsNavigator';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { logoutDB } from '../utils/auth';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  const headerOptions = {
    headerRight: () => <LogoutButton onPress={logoutDB} />,
    tabBarLabel: '',
    tabBarStyle: { paddingVertical: 12, paddingHorizontal: 50, gap: 32, justifyContent: 'center' },
    tabBarOptions: {
      activeTintColor: colors.accent,
      inactiveTintColor: colors.text.default,
    },
  };

  return (
    <Tab.Navigator initialRouteName='Posts' screenOptions={{ headerStatusBarHeight: 44 }}>
      <Tab.Screen
        name='Posts'
        component={PostsNavigator}
        options={{
          ...headerOptions,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomButton, focused && styles.bottomButtonActive]}>
              <Ionicons name={focused ? 'apps' : 'apps-outline'} size={24} color={focused ? colors.accent : colors.text.default} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='Create Post'
        component={CreatePostScreen}
        options={({ navigation }) => ({
          ...headerOptions,
          headerRight: null,
          title: 'Create Post',
          tabBarStyle: { display: 'none' },
          headerLeft: () => <BackButton title='Posts' onPress={() => navigation.goBack()} />,
          tabBarIcon: () => (
            <View style={[styles.bottomButton, styles.bottomButtonBig, styles.bottomButtonBigActive]}>
              <Ionicons name={'add'} size={24} color={colors.white} />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          ...headerOptions,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bottomButton, focused && styles.bottomButtonActive]}>
              <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={focused ? colors.accent : colors.text.default} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    width: 40,
    height: 40,
    marginVertical: 'auto',
    backgroundColor: 'transparent',
    color: colors.text.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonActive: {
    color: colors.accent,
  },
  bottomButtonBig: {
    width: 70,
    height: 40,
    color: colors.accent,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 20,
  },
  bottomButtonBigActive: {
    backgroundColor: colors.accent,
    color: colors.white,
  },
});

export default HomeNavigator;
