import React from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';
import {IC_checkFail, IC_checkSucceed} from '../../assets/icons/index.js';

const TextInputCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>{props.title}</Text>
          <TextInput
            style={styles.textinputStyle}
            placeholder={props.txtInput}
            // placeholderTextColor='CUSTOM_COLOR.Black'
            onChangeText={props.onChangeText}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={props.keyboardType}
            value={props.value}
          />
        </View>
        <View style={styles.checkContainer} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: CUSTOM_COLOR.White,
  },
  childContainer: {
    width: '90%',
    height: '80%',
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 6,
    justifyContent: 'center',
    marginLeft: '3%',
  },
  textStyle: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    marginTop: '3%',
  },
  textinputStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 18,
    color: CUSTOM_COLOR.Black,
  },
  checkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TextInputCard;
