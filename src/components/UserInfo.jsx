import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';

export const UserInfo = ({ user, style: outerStyle = {} }) => {
  const { name, email } = user;

  return (
    <View style={[styles.userInfo, outerStyle]}>
      <Image source={require('../../assets/images/avatar.jpg')} style={styles.avatar} />
      <View style={{ gap: 2, direction: 'column' }}>
        <Text style={{ fontWeight: 700, fontSize: 13, color: colors.text.default }}>{name}</Text>
        <Text style={{ fontWeight: 400, fontSize: 11, color: colors.text.default, opacity: 0.8 }}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 8,
    height: 60,
    marginHorizontal: 0,
    padding: 0,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: 'cover',
  },
});
