import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';
import NextButton from '../Buttons/NextButton.js';

const InfoCard = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.buttonContainer}>
        <Image
          source={props.icon}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.textinputStyle}>{props.title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <NextButton onPress={props.onPress}> </NextButton>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: CUSTOM_COLOR.White,
    borderColor: CUSTOM_COLOR.Silver,
    borderWidth: 1.5,
    flexDirection: 'row',
  },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  textinputStyle: {
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    // fontWeight: 'bold',
  },
});
export default InfoCard;
