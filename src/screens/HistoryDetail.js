import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import {firebase} from '../../Firebase/firebase.js';
import {getDatabase, ref, onValue} from 'firebase/database';
import {IMG_simpleFrog} from '../assets/images/index.js';
import {IC_account, IC_pin} from '../assets/icons/index.js';

const HistoryDetail = props => {
  const {navigation, route} = props;
  const data = route.params?.data;
  const [avatar, setAvatar] = useState('');

  const getUserData = uid => {
    const db = getDatabase();
    const starCountRef = ref(db, 'NGUOIDUNG/' + uid);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      if (data.Avatar !== undefined) {
        setAvatar(data.Avatar);
      }
    });
  };

  useEffect(() => {
    getUserData(firebase.auth().currentUser.uid);
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
            paddingHorizontal: 30,
          }}>
          History Detail
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 25,
            paddingHorizontal: 30,
          }}>
          <Text
            style={{
              fontSize: 13,
              paddingVertical: 2,
            }}>
            ID: {data.key}
          </Text>
          <View
            style={{
              width: 2,
              height: '100%',
              marginHorizontal: 5,
              backgroundColor: CUSTOM_COLOR.Silver,
            }}
          />
          <Text
            style={{
              fontSize: 13,
              paddingVertical: 2,
            }}>
            {data.ThoiGian}
          </Text>
        </View>
      </>

      <>
        <View style={{marginHorizontal: 30, marginVertical: 10}}>
          {data.HinhAnh && (
            <Image
              source={{uri: data.HinhAnh}}
              style={{
                height: 220,
                borderWidth: 1,
                borderColor: CUSTOM_COLOR.Silver,
                resizeMode: 'contain',
              }}
            />
          )}
        </View>
      </>

      {data.CauHoi && (
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
                <Text style={{color: CUSTOM_COLOR.White}}>{data.CauHoi}</Text>
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
      )}

      {data.TraLoi && (
        <>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
              marginLeft: 25,
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
                  backgroundColor: CUSTOM_COLOR.White,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                }}>
                <Text style={{color: CUSTOM_COLOR.Black}}>{data.TraLoi}</Text>
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
      )}

      {/* <>
        <View style={{flex: 1, justifyContent: 'flex-end', zIndex: 1}}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                width: '50%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                // borderRadius: 10,
                borderWidth: 1,
                borderColor: CUSTOM_COLOR.Red,
                alignSelf: 'center',
                // backgroundColor: CUSTOM_COLOR.White,
              }}
              onPress={() => {}}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.SemiBold,
                  fontSize: 16,
                  color: CUSTOM_COLOR.Red,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </> */}

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
              marginRight: -10,
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
  },
  inputContainer: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  buttonContainer: {
    height: 50,
    marginHorizontal: 30,
  },
});

export default HistoryDetail;
