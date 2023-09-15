import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {IMG_simpleFrog} from '../assets/images/index.js';
import {
  IC_account,
  IC_help,
  IC_locked,
  IC_logout,
  account,
} from '../assets/icons/index.js';
import HeaderWithBack from '../components/Headers/HeaderWithBack.js';
import InfoCard from '../components/Cards/InfoCard.js';
import {firebase} from '../../Firebase/firebase.js';
import {getDatabase, ref, onValue} from 'firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UploadFile from '../funtion/UploadFile.js';

const Account = props => {
  const {navigation} = props;
  const [avatar, setAvatar] = useState('');
  const [fullname, setFullname] = useState('fullname');
  const [nickname, setNickname] = useState('nickname');

  const getUserData = uid => {
    const db = getDatabase();
    const starCountRef = ref(db, 'NGUOIDUNG/' + uid);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      if (data.Avatar !== undefined) {
        setAvatar(data.Avatar);
      }

      if (data.TenND !== undefined) {
        setFullname(data.TenND);
      }

      if (data.NickName !== undefined) {
        setNickname(data.NickName);
      }
    });
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatar(response.assets[0].uri);
        console.log('Image uri: ', response.assets[0].uri);
        UploadFile(
          response.assets[0].uri,
          `NGUOIDUNG/${firebase.auth().currentUser.uid}/avata-${Date.now()}`,
          `/NGUOIDUNG/${firebase.auth().currentUser.uid}/Avatar`,
        );
      }
    });
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('SignIn');
      console.log('User signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    getUserData(firebase.auth().currentUser.uid);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={styles.headerContainer}>
          <HeaderWithBack onPress={() => navigation.goBack()} title="Account" />
        </View>

        <View
          style={{
            width: '100%',
            height: 2,
            backgroundColor: CUSTOM_COLOR.Silver,
          }}
        />
      </>

      <>
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={() => chooseImage()}>
            {avatar ? (
              <Image
                source={{uri: avatar}}
                style={{
                  width: 130,
                  height: 130,
                  borderWidth: 1,
                  borderColor: CUSTOM_COLOR.Silver,
                  borderRadius: 65,
                  margin: 20,
                }}
              />
            ) : (
              <Image
                source={IC_account}
                style={{
                  width: 130,
                  height: 130,
                  borderWidth: 1,
                  borderColor: CUSTOM_COLOR.Black,
                  borderRadius: 65,
                  margin: 20,
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            <View style={{width: '100%', height: 15}} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: CUSTOM_COLOR.Black,
                marginVertical: 5,
              }}>
              {fullname}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: CUSTOM_COLOR.Black,
              }}>
              {nickname}
            </Text>
          </View>
        </View>
      </>

      <>
        <View style={styles.cardContainer}>
          <InfoCard
            title="Your profile"
            icon={account}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>

        <View style={styles.spaceContainer} />

        <View style={styles.cardContainer}>
          <InfoCard
            title="Change password"
            icon={IC_locked}
            onPress={() => navigation.navigate('ChangePassword')}
          />
        </View>

        <View style={styles.spaceContainer} />

        <View style={styles.cardContainer}>
          <InfoCard
            title="Help"
            icon={IC_help}
            onPress={() => navigation.navigate('Help')}
          />
        </View>

        <View style={styles.spaceContainer} />

        <View style={styles.cardContainer}>
          <InfoCard
            title="Sign out"
            icon={IC_logout}
            onPress={() => handleSignOut()}
          />
        </View>
      </>

      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Image
          source={IMG_simpleFrog}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.Zanah,
  },
  headerContainer: {
    width: '100%',
    height: 50,
  },
  infoContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: CUSTOM_COLOR.White,
    alignItems: 'center',
    borderColor: CUSTOM_COLOR.Silver,
    borderWidth: 1.5,
    flexDirection: 'row',
  },
  cardContainer: {
    marginHorizontal: 15,
    height: 60,
  },
  spaceContainer: {
    width: '100%',
    height: 10,
  },
});
export default Account;
