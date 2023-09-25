import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import {IC_email, IC_locked} from '../assets/icons/index.js';
import {IMG_frog} from '../assets/images/index.js';
import {firebase} from '../../Firebase/firebase.js';
import NavigateButton from '../components/Buttons/NavigateButton.js';
import FloatingLabelInputWithIcon from '../components/Cards/FloatingLabelInputWithIcon.js';
import FloatingLabelPasswordWithIcon from '../components/Cards/FloatingLabelPasswordWithIcon.js';
import FONT_FAMILY from '../constants/fonts.js';

const SignIn = props => {
  const {navigation} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (email, password) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!', response.user.uid);
      navigation.navigate('Tabs');
    } catch (error) {
      console.log('Error signing in:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <>
        <View style={styles.topContainer}>
          <View
            style={{
              width: 50,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: CUSTOM_COLOR.White,
            }}>
            <PreviousButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      </> */}

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
              fontFamily: FONT_FAMILY.Logo,
            }}>
            Wellcome
          </Text>
          <Text style={{fontSize: 13}}>
            Please sign in your account to continue
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
            <View style={styles.inputContainer}>
              <FloatingLabelPasswordWithIcon
                value={password}
                label="Password"
                icon={IC_locked}
                onChangeText={password => setPassword(password)}
                error="*Password is required"
              />
            </View>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword_Email')}>
                <Text
                  style={{
                    fontSize: 14,
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>

        <>
          <View style={styles.buttonContainer}>
            <NavigateButton
              text="Login"
              onPress={() => handleSignIn(email, password)}
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
  topContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    marginVertical: 15,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
  },
});

export default SignIn;
