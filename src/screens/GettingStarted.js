import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import TextInputCard from '../components/Cards/TextInputCard.js';
import NavigateButton from '../components/Buttons/NavigateButton.js';
import {IMG_Background, IMG_avata} from '../assets/images/index.js';
import {IC_camera, IC_upload} from '../assets/icons/index.js';

const GettingStarted = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Background}
        resizeMode="cover"
        style={styles.container}>
        <>
          <View style={styles.textContainer}>
            <Text style={styles.textSignUpStyle}>
              Make a nickname and an avatar for yourself to get started!
            </Text>
          </View>
        </>

        <>
          <View style={styles.avataContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={IMG_avata}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 130,
                }}
              />
            </View>

            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.unitContainer}
                // onPress={() => navigation.navigate('ForgotPassword_Email')}
              >
                <Image source={IC_camera} style={styles.imageOptionContainer} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.unitContainer}
                // onPress={() => navigation.navigate('ForgotPassword_Email')}
              >
                <Image source={IC_upload} style={styles.imageOptionContainer} />
              </TouchableOpacity>
            </View>
          </View>
        </>

        <>
          <View style={styles.inputContainer}>
            <TextInputCard title="Nickname" txtInput="..." />
          </View>
        </>

        <>
          <View style={styles.buttonContainer}>
            <NavigateButton
              text="START"
              onPress={() => navigation.navigate('Home_Question')}
            />
          </View>
        </>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    width: '80%',
    height: 120,
    marginLeft: '10%',
    marginTop: 40,
  },
  textSignUpStyle: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: 30,
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  avataContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  optionContainer: {
    width: 150,
    height: 50,
    marginTop: -15,
    flexDirection: 'row',
  },
  unitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOptionContainer: {
    width: '50%',
    height: '50%',
    resizeMode: 'cover',
  },
  inputContainer: {
    backgroundColor: 'red',
    width: '90%',
    height: 80,
    marginTop: 40,
    marginLeft: '5%',
  },
  buttonContainer: {
    width: '90%',
    height: 55,
    marginTop: 40,
    marginLeft: '5%',
  },
});
export default GettingStarted;
