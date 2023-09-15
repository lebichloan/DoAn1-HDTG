import React, {useState} from 'react';
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
import NavigateButton from '../components/Buttons/NavigateButton.js';
import {firebase} from '../../Firebase/firebase.js';
import {IMG_simpleFrog} from '../assets/images/index.js';
import FloatingLabelInputPassword from '../components/Cards/FloatLabelInputPassword.js';

const ChangePassword = props => {
  const {navigation} = props;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const reauthenticate = oldPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const onChangePasswordPress = newPassword => {
    reauthenticate(oldPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert.alert('Sucess', 'Your password has been changed');
            navigation.goBack();
          })
          .catch(error => {
            Alert.alert('Sucess', error.message);
          });
      })
      .catch(error => {
        Alert.alert('Sucess', error.message);
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
          Change Password
        </Text>
        <Text style={{fontSize: 13, marginBottom: 25}}>
          Set the new password for your account
        </Text>
      </>

      <>
        <View style={{marginVertical: 25}}>
          <View style={styles.inputContainer}>
            <FloatingLabelInputPassword
              value={oldPassword}
              lable="Old password"
              onChangeText={oldPassword => setOldPassword(oldPassword)}
              error="*Old password is required"
            />
          </View>
          <View style={styles.inputContainer}>
            <FloatingLabelInputPassword
              value={newPassword}
              lable="New password"
              onChangeText={newPassword => setNewPassword(newPassword)}
              error="*New password is required"
            />
          </View>
          <View style={styles.inputContainer}>
            <FloatingLabelInputPassword
              value={confirmPassword}
              lable="Confirm password"
              onChangeText={confirmPassword =>
                setConfirmPassword(confirmPassword)
              }
              error="*Confirm new password is required"
            />
          </View>
        </View>
      </>

      <>
        <View style={styles.buttonContainer}>
          <NavigateButton
            text="Save"
            onPress={() => {
              if (!reauthenticate(oldPassword)) {
                Alert.alert(
                  'Error',
                  'Your old password is  wrong. Please enter your password again.',
                );
              } else {
                if (newPassword === oldPassword) {
                  Alert.alert(
                    'Error',
                    'New password have been not match with old password',
                  );
                } else if (newPassword === confirmPassword) {
                  onChangePasswordPress(newPassword);
                } else {
                  Alert.alert(
                    'Error',
                    'Corfirm password not match with password',
                  );
                }
              }
            }}
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
            onPress={() => navigation.navigate('ForgotPassword_Email')}
            style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
              }}>
              Forgot Password? {}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: CUSTOM_COLOR.White,
                fontWeight: 'bold',
              }}>
              {/* Sign In */}
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
    marginVertical: 15,
    zIndex: 1,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    zIndex: 1,
  },
});
export default ChangePassword;
