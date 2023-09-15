import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PreviousButton from '../Buttons/PreviousButton.js';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';

const HeaderWithBack = props => {
  return (
    <View style={styles.header}>
      <View style={styles.buttonContainer}>
        <PreviousButton onPress={props.onPress}> </PreviousButton>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.textinputStyle}>{props.title}</Text>
      </View>
      <View style={styles.buttonContainer} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: CUSTOM_COLOR.White,
    alignItems: 'center',
  },
  buttonContainer: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textinputStyle: {
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});
export default HeaderWithBack;
