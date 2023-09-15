import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import NavigateButton from '../components/Buttons/NavigateButton.js';
import FloatingLabelInputWithIcon from '../components/Cards/FloatingLabelInputWithIcon.js';
import {IMG_frog} from '../assets/images/index.js';
import {IC_email} from '../assets/icons/index.js';
import {firebase} from '../../Firebase/firebase.js';

const ForgotPassword_Email = props => {
  const {navigation} = props;
  const [email, setEmail] = useState('');

  const fogotPassword = email => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        navigation.navigate('ForgotPassword_Succeed');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={{flex: 1, resizeMode: 'center'}} source={IMG_frog} />
      </View>

      <View style={styles.cardContainer}>
        <>
          <Text
            style={{
              fontSize: 24,
              marginTop: 30,
              color: CUSTOM_COLOR.Black,
              fontWeight: 'bold',
            }}>
            Forgot Password
          </Text>
          <Text style={{fontSize: 13}}>
            Please enter your email to get the link reset password
          </Text>
        </>

        <>
          <View style={{marginVertical: 25}}>
            <View style={styles.inputContainer}>
              <FloatingLabelInputWithIcon
                value={email}
                label="Email"
                icon={IC_email}
                onChangeText={email => setEmail(email)}
                keyboardType="email-address"
                error="*Email is required"
              />
            </View>
          </View>
        </>

        <>
          <View style={styles.buttonContainer}>
            <NavigateButton
              text="Send Email"
              onPress={() => fogotPassword(email)}
            />
          </View>
        </>

        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: CUSTOM_COLOR.Silver,
                marginVertical: 5,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                }}>
                Don't have an account? {}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: CUSTOM_COLOR.FruitSalad,
                  fontWeight: 'bold',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.FruitSalad,
  },
  logoContainer: {
    flex: 3,
    backgroundColor: CUSTOM_COLOR.FruitSalad,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 5,
    backgroundColor: CUSTOM_COLOR.Zanah,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
  },
});
export default ForgotPassword_Email;
