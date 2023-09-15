import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';

const FloatingLabelInputWithIcon = props => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    // // Check if the input value has not been changed
    // if (!props.value.trim()) {
    //   setHasError(true);
    // } else {
    //   setHasError(false);
    // }
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

  useEffect(() => {
    setHasError.false;
  }, []);

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused
              ? CUSTOM_COLOR.FruitSalad
              : hasError
              ? CUSTOM_COLOR.Red
              : CUSTOM_COLOR.Silver,
          },
        ]}>
        <Image
          source={props.icon}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            marginHorizontal: 10,
          }}
        />
        <TextInput
          style={{
            flex: 1,
            color: CUSTOM_COLOR.Black,
            fontSize: 16,
          }}
          value={props.value}
          onChangeText={props.onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={props.label}
          keyboardType={props.keyboardType}
        />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingLabelInputWithIcon;
