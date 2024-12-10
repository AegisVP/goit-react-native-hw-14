import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { style as genStyles } from '../../styles/general';
import { styles as postMetaStyles } from '../components/PostCard';
import { LogoutButton } from '../components/LogoutButton';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { PostCard } from '../components/PostCard';

const ProfileScreen = ({ user, posts, comments, doLogout }) => {
  const handleChangeAvatar = () => {
    console.log('Change avatar logic');
  };

  const handleLogout = () => {
    doLogout();
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
        <Ionicons name='location-outline' size={16} /> <Text style={{ color: colors.text.default, textDecorationLine: 'underline' }}>{locality}</Text>
      </Text>
    </View>
  );

  return (
    <>
      <Image source={require('../../assets/images/register_bg.jpg')} style={genStyles.backgroundImage} />
      <ScrollView style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Pressable onPress={handleChangeAvatar} style={{ position: 'relative', top: 60, width: 120, height: 120, marginHorizontal: 'auto', zIndex: 1 }}>
          <Image source={require(`../../assets/images/avatar.jpg`)} style={{ width: 120, height: 120, borderRadius: 16 }} />
        </Pressable>
        <View
          style={{
            minHeight: '200%',
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'start',
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
          <Text style={{ fontWeight: 500, fontSize: 30 }}>{user.name}</Text>
          <View style={{ flex: 1, width: '100%', gap: 32, margin: 0, paddingHorizontal: 16 }}>
            {posts.map(item => (
              <PostCard key={item.id} post={item} metaLine={() => <MetaLine item={item} />} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
