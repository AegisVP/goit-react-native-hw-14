import React, { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as LocationSvc from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../../styles/colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { addPost as addPostDB } from '../utils/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/postsSlice';
import { selectUserInfo } from '../redux/userSlice';

const CreatePostScreen = () => {
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({});
  const [cameraType, setCameraType] = useState('back');
  const [cameraReady, setCameraReady] = useState(false);
  const [camPermission, requestCamPermission] = useCameraPermissions();
  const camera = useRef();
  const titleField = useRef();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    selectLocation();
  }, []);

  const selectLocation = async () => {
    let { status } = await LocationSvc.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let locationResponse = await LocationSvc.getCurrentPositionAsync({});
    setLocation(locationResponse.coords);
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const takePicture = () => {
    if (!cameraReady || !camera) return;
    camera.current?.takePictureAsync({ base64: true }).then(data => {
      setImageData(data);
      selectLocation();
      console.log({ titleField });
      titleField?.current?.focus();
    });
  };

  const clearPicture = () => {
    setImageData(null);
    setLocation({});
  };

  const createPost = () => {
    if (title.length === 0) return;

    // TODO: process location, convert coordinates to city/country format
    const locality = 'Somewhere in the world';

    // TODO: handle saving the post
    const newPost = {
      comments: [],
      pictureUrl: imageData?.uri ?? '',
      pictureName: title,
      geo_latitude: location.latitude,
      geo_longitude: location.longitude,
      locality,
    };
    console.log({ newPost });
    addPostDB(user.uid, newPost);
    dispatch(addPost(newPost));

    setImageData(null);
    setTitle('');
    setLocation({});

    navigate('Posts');
  };

  if (!camPermission) {
    // Camera permissions are still loading.
    console.log('Camera permissions are still loading...');
    return <View />;
  }

  if (!camPermission.granted) {
    // Camera permissions are not granted yet.
    console.log('Camera permissions are not granted yet...');
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', paddingBottom: 10 }}>We need your permission to show the camera</Text>
        <Button onPress={requestCamPermission} title='' style={{ color: colors.button.default.text }}>
          Grant permission
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, width: '100%', padding: 16, backgroundColor: colors.backgroundMain }}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', direction: 'column', gap: 32 }}>
      <View style={{ flex: 1, width: '100%' }}>
        {imageData ? (
          <View style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 8, overflow: 'hidden' }}>
            <Image source={{ uri: `data:image/jpeg;base64,${imageData.base64}` }} style={{ flex: 1, height: 240 }} />
            <Pressable onPress={clearPicture} style={[styles.cameraButton, { position: 'absolute', bottom: 10, left: '10', backgroundColor: `${colors.white}4D` }]}>
              <Ionicons name='trash-bin' size={24} color={colors.white} />
            </Pressable>
          </View>
        ) : (
          <CameraView
            ref={camera}
            onCameraReady={() => setCameraReady(true)}
            type={cameraType}
            style={{
              flex: 1,
              height: 240,
              borderWidth: 1,
              borderColor: colors.input.default.border,
              borderRadius: 8,
              overflow: 'hidden',
            }}>
            <Pressable onPress={takePicture} style={{ flex: 1, backgroundColor: 'transparent' }}>
              <View style={[styles.cameraButton, { position: 'absolute', top: '50%', left: '50%', transform: 'translateX("-30px"), translateY("-30px")' }]}>
                <Ionicons name='camera' size={24} color={colors.text.secondary} />
              </View>
            </Pressable>
          </CameraView>
        )}
      </View>
      <KeyboardAvoidingView style={{ width: '100%', direction: 'column', gap: 16 }}>
        <Input value={title} onChangeText={setTitle} placeholder='Title...' passRef={titleField} />
        <Input value={location.latitude && `${location.latitude}, ${location.longitude}`} onPress={selectLocation} placeholder='Location...' />
      </KeyboardAvoidingView>
      <Button onPress={createPost}>
        <Text style={{ color: colors.white }}>Create new post</Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.white}4D`,
  },
});

export default CreatePostScreen;
