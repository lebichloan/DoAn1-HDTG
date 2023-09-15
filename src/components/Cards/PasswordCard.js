import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';
import {IC_hide, IC_show} from '../../assets/icons/index.js';

const PasswordCard = props => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}>{props.title}</Text>
          <TextInput
            style={styles.textinputStyle}
            placeholder={props.txtInput}
            // placeholderTextColor='CUSTOM_COLOR.Black'
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={props.onChangeText}
          />
        </View>
        <View style={styles.checkContainer}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={togglePasswordVisibility}>
            <Image
              style={styles.iconStyle}
              source={isPasswordVisible ? IC_show : IC_hide}
            />
          </TouchableOpacity>

          {/* <Image
            source={IC_hide}
            style={{width: '60%', height: '60%', resizeMode: 'contain'}}
          /> */}
        </View>
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
  iconStyle: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});
export default PasswordCard;
