import React, { useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import FastImage from 'react-native-fast-image';
import { Background } from '../assets';
import { screenHeight, screenWidth } from '../utils/style';
import { Preloader } from './Preloader';

export const Home = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsScrollEnabled(false);
        pan.setOffset({
          //@ts-ignore
          x: pan.x._value,
          //@ts-ignore
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        setIsScrollEnabled(true);
        pan.flattenOffset();
      },
    }),
  ).current;

  const onLoadEnd = () => setIsPreloaderVisible(false);

  return (
    <ScrollView
      scrollEnabled={isScrollEnabled}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.container}>
      <FastImage onLoadEnd={onLoadEnd} style={styles.imageBackground} source={Background}>
        <Animated.View
          style={{
            ...styles.cameraContainer,
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}>
          <RNCamera
            style={styles.camera}
            captureAudio={false}
            type={RNCamera.Constants.Type.front}
          />
        </Animated.View>
      </FastImage>
      <Preloader isVisible={isPreloaderVisible} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { width: screenWidth * 4, height: screenHeight * 4 },
  imageBackground: {
    flex: 1,
  },
  cameraContainer: {
    borderRadius: 70,
    overflow: 'hidden',
    height: 140,
    width: 140,
  },
  camera: {
    flex: 1,
  },
});
