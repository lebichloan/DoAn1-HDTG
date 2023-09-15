import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, ImageBackground, Image} from 'react-native';
import {IMG_Background} from '../assets/images/index.js';

const Intro = () => (
  <SafeAreaView style={styles.container}>
    <ImageBackground
      source={IMG_Background}
      resizeMode="cover"
      style={styles.image}
    />
  </SafeAreaView>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Intro;
