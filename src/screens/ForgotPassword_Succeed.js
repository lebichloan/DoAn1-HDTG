import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import NavigateButton from '../components/Buttons/NavigateButton.js';
import {IMG_simpleFrog} from '../assets/images/index.js';
import {IC_sendEmailSucess} from '../assets/icons/index.js';

const ForgotPassword_Succeed = props => {
  const {navigation} = props;

  return (
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.headerContainer}>
    //     <HeaderWithBack onPress={() => navigation.goBack()} title="Login" />
    //   </View>

    //   <>
    //     <View style={styles.imageContainer}>
    //       <Image
    //         source={IMG_succeed}
    //         style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
    //       />
    //     </View>
    //   </>

    //   <>
    //     <View style={styles.textContainer}>
    //       <View style={styles.unitContainer}>
    //         <Text style={styles.titleStyle}>CONGRATULATION! </Text>
    //       </View>
    //       {/* <View style={{width: '100%', height: 10}} /> */}
    //       <View style={styles.unitContainer}>
    //         <Text style={styles.contentStyle}>
    //           Please check your email to get
    //         </Text>
    //         <Text style={styles.contentStyle}>the link reset password.</Text>
    //       </View>
    //     </View>
    //   </>

    //   <>
    //     <View style={styles.buttonContainer}>
    //       <NavigateButton
    //         text="GO TO LOGIN"
    //         onPress={() => navigation.navigate('Login')}
    //       />
    //     </View>
    //   </>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20%',
          }}>
          <Image
            source={IC_sendEmailSucess}
            style={{
              width: 300,
              height: 300,
              resizeMode: 'center',
            }}
          />
        </View>
      </>

      <>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
            zIndex: 1,
          }}>
          <Text
            style={{
              fontSize: 24,
              color: CUSTOM_COLOR.Black,
              fontWeight: 'bold',
              marginVertical: 5,
            }}>
            Email sent
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginBottom: 50,
              textAlign: 'center',
              textAlignVertical: 'center',
              lineHeight: 18,
            }}>
            Please check your email and click on the link into email to continue
          </Text>
        </View>
      </>

      <>
        <View style={styles.buttonContainer}>
          <NavigateButton
            text="Back to Sign in"
            onPress={() => navigation.navigate('SignIn')}
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
              marginBottom: -5,
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
  buttonContainer: {
    width: '100%',
    height: 50,
  },
});
export default ForgotPassword_Succeed;
