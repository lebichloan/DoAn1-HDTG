import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import NavigateButton from '../components/Buttons/NavigateButton.js';
import FloatingLabelInputWithIcon from '../components/Cards/FloatingLabelInputWithIcon.js';
import FloatingLabelPasswordWithIcon from '../components/Cards/FloatingLabelPasswordWithIcon.js';
import {firebase} from '../../Firebase/firebase.js';
import {getDatabase, ref, set} from 'firebase/database';
import {IC_accountChoose, IC_email, IC_locked} from '../assets/icons/index.js';
import {IMG_simpleFrog} from '../assets/images/index.js';

const SignUp = props => {
  const {navigation} = props;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  const handleSignUp = async (fullName, email, password) => {
    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully:', userCredentials.user);
      handlePushData(userCredentials.user.uid, fullName, email);
    } catch (error) {
      console.log('Error registering user: ', error);
      Alert.alert('Error', error.message);
    }
  };

  const handlePushData = (uid, fullName, email) => {
    const db = getDatabase();
    set(ref(db, 'NGUOIDUNG/' + uid), {
      MaND: uid,
      TenND: fullName,
      Email: email,
      SoLuotHoi: 0,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Text
          style={{
            fontSize: 24,
            marginTop: 75,
            color: CUSTOM_COLOR.Black,
            fontWeight: 'bold',
          }}>
          Create Account
        </Text>
        <Text style={{fontSize: 13, marginBottom: 25}}>
          Please sign up to get started
        </Text>
      </>

      <>
        <View style={{marginVertical: 25}}>
          <View style={styles.inputContainer}>
            <FloatingLabelInputWithIcon
              value={fullName}
              label="Full name"
              icon={IC_accountChoose}
              onChangeText={fullName => setFullName(fullName)}
              error="*Full name is required"
            />
          </View>
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
          <View style={styles.inputContainer}>
            <FloatingLabelPasswordWithIcon
              value={password}
              label="Password"
              icon={IC_locked}
              onChangeText={password => setPassword(password)}
              error="*Password is required"
            />
          </View>
          <View style={styles.inputContainer}>
            <FloatingLabelPasswordWithIcon
              value={confirmPassword}
              label="Confirm password"
              icon={IC_locked}
              onChangeText={confirmPassword =>
                setConfirmPassword(confirmPassword)
              }
              error="*Confirm password is required"
            />
          </View>
        </View>
      </>

      <>
        <View style={styles.buttonContainer}>
          <NavigateButton
            text="Sign Up"
            onPress={() => handleSignUp(fullName, email, password)}
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
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              position: 'relative',
              marginBottom: -45,
              marginRight: -60,
            }}>
            <Image
              source={IMG_simpleFrog}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: CUSTOM_COLOR.Silver,
              marginVertical: 5,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
              }}>
              Already have an account? {}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: CUSTOM_COLOR.White,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.Zanah,
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    zIndex: 1,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    zIndex: 1,
  },
});
export default SignUp;
