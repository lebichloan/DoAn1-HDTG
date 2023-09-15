import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';

const FloatingLabelDateTime = props => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused
            ? CUSTOM_COLOR.FruitSalad
            : CUSTOM_COLOR.Silver,
        },
      ]}>
      <View style={{position: 'relative'}}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            color: CUSTOM_COLOR.Black,
            fontSize: 16,
            paddingHorizontal: 20,
            justifyContent: 'center'
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPress={props.onPress}>
          <Text
            style={{color: CUSTOM_COLOR.Black, fontSize: 16}}>
            {props.value}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            backgroundColor: CUSTOM_COLOR.White,
            paddingHorizontal: 5,
            color: isFocused ? CUSTOM_COLOR.FruitSalad : CUSTOM_COLOR.Black,
            fontSize: isFocused || props.value !== '' ? 12 : 16,
            position: 'absolute',
            top: isFocused || props.value !== '' ? -10 : 9,
            left: 15,
          }}>
          {props.lable}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: CUSTOM_COLOR.White,
  },
});

export default FloatingLabelDateTime;
