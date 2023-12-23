import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import HeaderWithBack from '../components/Headers/HeaderWithBack.js';
import NavigateButton from '../components/Buttons/NavigateButton.js';
import {IMG_succeed} from '../assets/images/index.js';

const SignUp_Succeed = props => {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={styles.imageContainer}>
          <Image
            source={IMG_succeed}
            style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
          />
        </View>
      </>

      <>
        <View style={styles.textContainer}>
          <View style={styles.unitContainer}>
            <Text style={styles.titleStyle}>CONGRATULATION! </Text>
          </View>
          <View style={styles.unitContainer}>
            <Text style={styles.contentStyle}>
              Your account has been activated
            </Text>
            <Text style={styles.contentStyle}>
              To continue please login to use our service
            </Text>
          </View>
        </View>
      </>

      <>
        <View style={styles.buttonContainer}>
          <NavigateButton
            text="GO TO LOGIN"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.Zanah,
  },
  imageContainer: {
    width: '80%',
    height: 330,
    marginLeft: '7%',
    marginTop: '15%',
  },
  textContainer: {
    width: '90%',
    height: 130,
    marginLeft: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  unitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: 30,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
  contentStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
    marginVertical: 5,
  },
  buttonContainer: {
    width: '90%',
    height: 55,
    marginTop: 30,
    marginLeft: '5%',
  },
});
export default SignUp_Succeed;
