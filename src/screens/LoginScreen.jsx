import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style } from '../../styles/general';
import { colors } from '../../styles/colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ShowPasswordButton } from '../components/ShowPassButton';
import { useDispatch } from 'react-redux';
import { loginDB } from '../utils/auth';
import { setUserInfo } from '../redux/userSlice';

const LoginScreen = ({ setIsLoggedin }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassEntry, setSecurePassEntry] = useState(true);
  const dispatch = useDispatch();

  const doLogin = () => {
    setIsLoggedin(false);
    setIsLoading(true);
    setError('');

    loginDB({ email, password })
      .then(({ uid, email, displayName, profilePhoto }) => {
        dispatch(setUserInfo({ uid, email, displayName, profilePhoto }));
        setIsLoggedin(true);
      })
      .catch(() => setError('Invalid email or password'))
      .finally(() => setIsLoading(false));
  };

  const gotoSignup = () => {
    navigation.navigate('Register');
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <Image source={require('../../assets/images/register_bg.jpg')} style={style.backgroundImage} />
      <KeyboardAvoidingView style={style.authWindowContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={style.loginTitle}>Login</Text>
        <Input value={email} onChangeText={setEmail} placeholder='Email address' textContentType='emailAddress' autofocus={true} />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
          secureTextEntry={securePassEntry}
          rightButton={ShowPasswordButton({ securePassEntry, setSecurePassEntry })}
        />
        {error !== '' && <Text style={{ color: colors.text.error, textAlign: 'center', fontWeight: 500 }}>{error}</Text>}
        <Button onPress={doLogin} outerStyle={{ marginHorizontal: 'auto', marginTop: 43 - 16 }} disabled={isLoading}>
          <Text style={{ color: colors.button.default.text }}>{isLoading ? 'Wait...' : 'Log in'}</Text>
        </Button>
        <View style={style.redirectText}>
          <Text>
            Don't have an account?
            <TouchableWithoutFeedback onPress={gotoSignup}>
              <Text style={{ color: colors.text.link }}> Register</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default LoginScreen;
