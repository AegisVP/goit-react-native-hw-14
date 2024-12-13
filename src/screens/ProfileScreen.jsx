import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { style as genStyles } from '../../styles/general';
import { styles as postMetaStyles } from '../components/PostCard';
import { LogoutButton } from '../components/LogoutButton';
import { colors } from '../../styles/colors';
import { PostCard } from '../components/PostCard';
import { clearUserInfo, selectUserInfo, setUserInfo } from '../redux/userSlice';
import { selectPosts } from '../redux/postsSlice';
import { updateUserInFirestore } from '../utils/firestore';
import { EditableText } from '../components/EditableText';
import { logoutDB } from '../utils/auth';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const posts = useSelector(selectPosts);

  const handleChangeAvatar = profilePhoto => {
    updateUserInFirestore(userInfo.uid, { profilePhoto });
    dispatch(setUserInfo({ ...userInfo, profilePhoto }));
  };

  const handleChangeName = displayName => {
    updateUserInFirestore(userInfo.uid, { displayName });
    dispatch(setUserInfo({ ...userInfo, displayName }));
  };

  const handleLogout = () => {
    dispatch(clearUserInfo());
    logoutDB();
  };

  const MetaLine = ({ item: { comments, likes = [], locality } }) => (
    <View style={postMetaStyles.postMeta}>
      <View style={{ gap: 24, flexDirection: 'row' }}>
        <Text style={[postMetaStyles.postDescription, { color: comments.length > 0 ? colors.default : colors.text.secondary }]}>
          <Ionicons name='chatbubbles' color={colors.accent} size={16} /> <Text>{comments.length}</Text>
        </Text>
        <Text style={[postMetaStyles.postDescription, { color: likes.length > 0 ? colors.default : colors.text.secondary }]}>
          <Ionicons name='thumbs-up-outline' color={colors.accent} size={16} /> <Text>{likes.length}</Text>
        </Text>
      </View>
      <Text style={[postMetaStyles.postDescription, { color: colors.text.secondary }]}>
        <Ionicons name='location-outline' size={16} />
        <Text style={{ color: colors.text.default, textDecorationLine: 'underline' }}> {locality}</Text>
      </Text>
    </View>
  );

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss;
      }}>
      <Image source={require('../../assets/images/register_bg.jpg')} style={genStyles.backgroundImage} />
      <ScrollView style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Pressable onPress={handleChangeAvatar} style={{ position: 'relative', top: 60, width: 120, height: 120, marginHorizontal: 'auto', zIndex: 1 }}>
          <Image source={{ uri: userInfo?.profilePhoto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={{ width: 120, height: 120, borderRadius: 16 }} />
        </Pressable>
        <View
          style={{
            flex: 1,
            minHeight: '200%',
            justifyContent: 'start',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingTop: 60 + 32,
            gap: 32,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}>
          <LogoutButton onPress={handleLogout} style={{ position: 'absolute', top: 6, right: 0, padding: 16 }} iconProps={{ color: colors.text.secondary }} />
          <Pressable
            onPress={handleChangeAvatar}
            style={{ position: 'absolute', top: 14, right: '33%', padding: 0, borderRadius: '50%', overflow: 'hidden', backgroundColor: colors.white, zIndex: 1 }}>
            <Ionicons name='add-circle-outline' size={24} color={colors.text.secondary} style={{ transform: [{ rotate: '45deg' }] }} />
          </Pressable>
          <EditableText value={userInfo.displayName} onChange={handleChangeName} style={{ width: '100%', paddingHorizontal: 16 }} />
          <Text style={{ fontWeight: 500, fontSize: 30 }}>{userInfo.email}</Text>
          <EditableText value={userInfo.profilePhoto} onChange={handleChangeAvatar} style={{ width: '100%', paddingHorizontal: 16 }} />
          <View style={{ flex: 1, width: '100%', gap: 32, margin: 0, paddingHorizontal: 16 }}>
            {posts.map(item => (
              <PostCard key={item.id} post={item} metaLine={() => <MetaLine item={item} />} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Pressable>
  );
};

export default ProfileScreen;
