import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {
  IC_camera,
  IC_upload,
  IC_send,
  IC_image,
  IC_file,
  IC_right,
  IC_account,
  IC_pin,
} from '../assets/icons/index.js';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UploadFile from '../funtion/UploadFile.js';
import HeaderWithBack from '../components/Headers/HeaderWithBack.js';
import {firebase} from '../../Firebase/firebase.js';
import {getDatabase, ref, onValue} from 'firebase/database';
import UpdateData from '../funtion/UpdateData.js';
import {IMG_simpleFrog} from '../assets/images/index.js';
import axios from 'axios';

const Home_Question = props => {
  const {navigation} = props;
  const [avatar, setAvatar] = useState('');
  const [count, setCount] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('123');
  const [hasPush, setHasPush] = useState(false);

  const submitQuestion = async () => {
    getQuestion();

    console.log(
      '🚀 ~ file: App.tsx:19 ~ App ~ question:',
      JSON.stringify({imageUrl, question}),
    );

    try {
      const response = await fetch('http://10.0.2.2:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({imageUrl, question}),
      });

      const data = await response.json();
      if (data.predictedAnswer) {
        setAnswer(data.predictedAnswer);
      } else if (data.error) {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const getUserData = uid => {
    const db = getDatabase();
    const starCountRef = ref(db, 'NGUOIDUNG/' + uid);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      if (data.Avatar !== undefined) {
        setAvatar(data.Avatar);
      }

      if (data.SoLuotHoi !== undefined) {
        setCount(data.SoLuotHoi);
      }
    });
  };

  const pushData = () => {
    UploadFile(
      imageUri,
      `LICHSU/${firebase.auth().currentUser.uid}/${Date.now()}`,
      `/LICHSU/${firebase.auth().currentUser.uid}/${count}/HinhAnh`,
    );

    UpdateData(
      question,
      `/LICHSU/${firebase.auth().currentUser.uid}/${count}/CauHoi`,
    );

    UpdateData(
      answer,
      `/LICHSU/${firebase.auth().currentUser.uid}/${count}/TraLoi`,
    );

    const date = new Date().toLocaleString();
    console.log('Date time: ', date);
    UpdateData(
      date,
      `/LICHSU/${firebase.auth().currentUser.uid}/${count}/ThoiGian`,
    );

    UpdateData(
      count + 1,
      `/NGUOIDUNG/${firebase.auth().currentUser.uid}/SoLuotHoi`,
    );

    setHasPush(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (text !== '') {
      setIsFocused(true);
    }
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
        setImageUri(response.assets[0].uri);
        if (hasPush === true) {
          setQuestion('');
          setAnswer('');
          setText('');
          setHasPush(false);
        }
        console.log('Image uri: ', response.assets[0].uri);
        handleUpData(imageUri);
      }
    });
  };

  const openCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
        if (hasPush === true) {
          setQuestion('');
          setAnswer('');
          setText('');
          setHasPush(false);
        }
        console.log('Image uri: ', response.assets[0].uri);
        handleUpData(imageUri);
      }
    });
  };

  const handleUpData = photoPath => {
    const data = new FormData();
    data.append('file', {
      uri: photoPath,
      type: 'image/jpg',
      name: photoPath.split('/').pop(),
    });
    data.append('upload_preset', 'movie_recommend');
    data.append('cloud_name', 'dvpt9evqt');

    fetch('https://api.cloudinary.com/v1_1/dvpt9evqt/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.url);
        console.log(data);
      })
      .catch(error => {
        Alert.alert('Error While Uploading');
      });
  };

  const getQuestion = () => {
    // if (question !== text || hasPush === true) {
    if (hasPush === true) {
      setQuestion(text);
      setText('');
      setAnswer('123');
      setHasPush(false);
    } else {
      setQuestion(text);
      setText('');
      setAnswer('123');
    }
  };

  const clearAll = () => {
    setImageUri(null);
    setQuestion('');
    setAnswer('');
    setText('');
    setHasPush(false);
  };

  useEffect(() => {
    getUserData(firebase.auth().currentUser.uid);

    if (text === '') {
      setOnChange(false);
    } else {
      setOnChange(true);
      setIsFocused(true);
    }

    if (
      imageUri !== null &&
      question !== '' &&
      answer !== '' &&
      hasPush === false
    ) {
      pushData();
    }
  }, [answer, count, imageUri, question, text]);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={styles.headerContainer}>
          <HeaderWithBack onPress={() => navigation.goBack()} title="Home" />
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
        <View
          style={{
            width: '90%',
            height: 250,
            marginVertical: 15,
            marginHorizontal: '5%',
          }}>
          {/* <TouchableOpacity onPress={() => setShowModal(true)}> */}
          {imageUri ? (
            <Image
              source={{uri: imageUri}}
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 1,
                borderColor: CUSTOM_COLOR.Silver,
                resizeMode: 'contain',
              }}
            />
          ) : (
            <Image
              source={IC_image}
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 1,
                borderColor: CUSTOM_COLOR.Silver,
                resizeMode: 'contain',
              }}
            />
          )}
          {/* </TouchableOpacity> */}
        </View>
        {/* <Modal visible={showModal} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              marginTop: -150,
            }}>
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={openCamera}>
                <Image
                  source={IC_camera}
                  style={{width: 50, height: 50, margin: 15}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={chooseImage}>
                <Image
                  source={IC_file}
                  style={{width: 50, height: 50, margin: 15}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
      </>

      {question ? (
        <>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: CUSTOM_COLOR.FruitSalad,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                }}>
                <Text style={{color: CUSTOM_COLOR.White}}>{question}</Text>
              </View>
              {avatar ? (
                <Image
                  source={{uri: avatar}}
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    borderColor: CUSTOM_COLOR.Silver,
                    borderRadius: 15,
                    marginHorizontal: 10,
                  }}
                />
              ) : (
                <Image
                  source={IC_account}
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    borderColor: CUSTOM_COLOR.Silver,
                    borderRadius: 15,
                    marginHorizontal: 10,
                  }}
                />
              )}
            </View>
          </View>
        </>
      ) : (
        <View />
      )}

      {answer ? (
        <>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <View
                style={{
                  // width: '70%',
                  backgroundColor: CUSTOM_COLOR.White,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                }}>
                <Text style={{color: CUSTOM_COLOR.Black}}>{answer}</Text>
              </View>
              <Image
                source={IC_pin}
                style={{
                  width: 20,
                  height: 20,
                  position: 'relative',
                  marginTop: -45,
                  marginLeft: -15,
                }}
              />
            </View>
          </View>
        </>
      ) : (
        <View />
      )}

      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: '20%',
          }}>
          <View
            style={{
              width: '100%',
              height: 50,
              flexDirection: 'row',
              // marginBottom: isFocused ? '0%' : '0%',
              backgroundColor: CUSTOM_COLOR.White,
            }}>
            {isFocused ? (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <TouchableOpacity onPress={() => setIsFocused(false)}>
                  <Image
                    source={IC_right}
                    style={{width: 20, height: 20, marginLeft: 5}}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 10,
                }}>
                <TouchableOpacity onPress={openCamera}>
                  <Image
                    source={IC_camera}
                    style={{width: 30, height: 30, margin: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={chooseImage}>
                  <Image
                    source={IC_file}
                    style={{width: 30, height: 30, marginHorizontal: 5}}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: 10,
              }}>
              <TextInput
                style={{flex: 1}}
                placeholder="Enter your question here"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={text => setText(text)}
                value={text}
              />
              {onChange ? (
                <TouchableOpacity onPress={submitQuestion}>
                  <Image
                    source={IC_send}
                    style={{width: 30, height: 30, margin: 5}}
                  />
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
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
  },
  headerContainer: {
    width: '100%',
    height: 50,
  },
});

export default Home_Question;
