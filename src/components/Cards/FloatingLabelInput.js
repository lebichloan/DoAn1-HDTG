import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';

const FloatingLabelInput = props => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Check if the input value has not been changed
    if (!props.value.trim()) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <View>
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
          <TextInput
            style={{
              width: '100%',
              height: '100%',
              color: CUSTOM_COLOR.Black,
              fontSize: 16,
              paddingHorizontal: 20,
              paddingBottom: 5,
            }}
            value={props.value}
            onChangeText={props.onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType={props.keyboardType}
          />
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
      {hasError && (
        <Text
          style={{fontSize: 10, color: CUSTOM_COLOR.Red, marginHorizontal: 5}}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: CUSTOM_COLOR.White,
  },
});

export default FloatingLabelInput;
