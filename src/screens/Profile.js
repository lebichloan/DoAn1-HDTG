import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FloatingLabelInput from '../components/Cards/FloatingLabelInput.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import {firebase} from '../../Firebase/firebase.js';
import {getDatabase, ref, onValue, update} from 'firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UploadFile from '../funtion/UploadFile.js';
import FloatingLabelDateTime from '../components/Cards/FloatingLabelDateTime.js';
import NavigateButton from '../components/Buttons/NavigateButton.js';
import {IMG_simpleFrog} from '../assets/images/index.js';

const Profile = props => {
  const {navigation} = props;
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSDT] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const getUserData = uid => {
    const db = getDatabase();
    const starCountRef = ref(db, 'NGUOIDUNG/' + uid);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      if (data.TenND != undefined) {
        setFullname(data.TenND);
      }

      if (data.NickName != undefined) {
        setNickname(data.NickName);
      }

      if (data.NgaySinh != undefined) {
        setBirth(data.NgaySinh);
      }

      if (data.Email != undefined) {
        setEmail(data.Email);
      }

      if (data.SDT != undefined) {
        setSDT(data.SDT);
      }
    });
  };

  const getCurrentDate = () => {
    const currentDate = date;
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    console.log('Current date: ', fDate);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowPicker(false);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    console.log('Date of birth: ', fDate);
    setBirth(fDate);
    setDate(selectedDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const updateUserData = (uid, fullname, nickname, birth, sdt) => {
    const db = getDatabase();
    const updates = {};
    updates[`/NGUOIDUNG/${uid}/TenND`] = fullname;
    updates[`/NGUOIDUNG/${uid}/NickName`] = nickname;
    updates[`/NGUOIDUNG/${uid}/NgaySinh`] = birth;
    updates[`/NGUOIDUNG/${uid}/SDT`] = sdt;
    console.log('Update data sucess');
    return update(ref(db), updates);
  };

  useEffect(() => {
    getUserData(firebase.auth().currentUser.uid);
    getCurrentDate();
  }, []);

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
          Your Profile
        </Text>
        <Text style={{fontSize: 13, marginBottom: 25}}>
          You can edit your profile here
        </Text>
      </>

      <>
        <View style={{marginVertical: 25}}>
          <View style={styles.inputContainer}>
            <FloatingLabelInput
              value={fullname}
              onChangeText={fullname => setFullname(fullname)}
              lable="Full name"
            />
          </View>

          <View style={styles.inputContainer}>
            <FloatingLabelInput
              value={nickname}
              onChangeText={nickname => setNickname(nickname)}
              lable="Nickname"
            />
          </View>

          <View style={styles.inputContainer}>
            <FloatingLabelDateTime
              value={birth}
              // onChangeText={birth => setBirth(birth)}
              lable="Date of birth"
              onPress={showDateTimePicker}
            />
          </View>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
            />
          )}

          <View style={styles.inputContainer}>
            <FloatingLabelInput value={email} lable="Email" />
          </View>

          <View style={styles.inputContainer}>
            <FloatingLabelInput
              value={sdt}
              onChangeText={sdt => setSDT(sdt)}
              keyboardType="phone-pad"
              lable="SDT"
            />
          </View>
        </View>
      </>

      <>
        <View style={styles.buttonContainer}>
          <NavigateButton
            text="Save"
            onPress={() => {
              updateUserData(
                firebase.auth().currentUser.uid,
                fullname,
                nickname,
                birth,
                sdt,
              );
              navigation.goBack();
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

export default Profile;
