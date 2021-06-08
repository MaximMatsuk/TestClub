import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { screenHeight, screenWidth } from '../utils/style';

export const Preloader = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#999999" />
    </View>
  ) : null;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
    zIndex: 999,
  },
});
