import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {
  IC_camera,
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
import ImagePicker from 'react-native-image-crop-picker';
import LoadingComponent from '../components/Cards/Loading.js';

const Home_Question = props => {
  const {navigation} = props;
  const [avatar, setAvatar] = useState('');
  const [count, setCount] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [hasPush, setHasPush] = useState(false);

  const submitQuestion = async () => {
    getQuestion();
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const data = {
        question: question,
      };

      formData.append('data', JSON.stringify(data));

      const apiEndpoint = 'https://hdtg.azurewebsites.net/predict_vqa';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log('result: ', result);
      setAnswer(result.data.answer);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const handleImageSelection = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        mediaType: 'photo',
      });

      handleUpData(image.path);
      setImageUri(image.path);
      if (hasPush === true) {
        setQuestion('');
        setAnswer('');
        setText('');
        setHasPush(false);
      }
    } catch (error) {
      Alert.alert('Image picker error:', error.message);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
        mediaType: 'photo',
      });

      handleUpData(image.path);
      setImageUri(image.path);
      if (hasPush === true) {
        setQuestion('');
        setAnswer('');
        setText('');
        setHasPush(false);
      }
    } catch (error) {
      Alert.alert('Image picker error:', error.message);
    }
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
        console.log('data url: ', data);
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
      setAnswer('');
      setHasPush(false);
    } else {
      setQuestion(text);
      setText('');
      setAnswer('');
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
      imageUrl !== null &&
      question !== '' &&
      answer !== '' &&
      hasPush === false
    ) {
      pushData();
    }
  }, [answer, count, imageUrl, question, text]);

  return (
    <SafeAreaView style={styles.container}>
      <>
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
          </View>
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
                  <TouchableOpacity onPress={handleOpenCamera}>
                    <Image
                      source={IC_camera}
                      style={{width: 30, height: 30, margin: 5}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleImageSelection}>
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
