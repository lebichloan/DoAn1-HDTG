import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import HeaderWithBack from '../components/Headers/HeaderWithBack.js';
import {IC_Search, IC_clear} from '../assets/icons/index.js';
import {firebase} from '../../Firebase/firebase.js';
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import {IMG_simpleFrog} from '../assets/images/index.js';

const History = props => {
  const {navigation} = props;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [hasSearch, setHasSearch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = () => {};

  const onSearch = value => {
    const db = getDatabase();
    const dataRef = ref(db, 'LICHSU/' + firebase.auth().currentUser.uid);
    const searchField = 'CauHoi';
    const searchQuery = query(
      dataRef,
      orderByChild(searchField),
      equalTo(value),
    );

    get(searchQuery)
      .then(snapshot => {
        if (snapshot.exists()) {
          // Data matching the search criteria is found in the 'snapshot'
          console.log('Matching data:', snapshot.val());
        } else {
          console.log('No matching data found.');
        }
      })
      .catch(error => {
        console.error('Error searching data: ', error);
      });
  };

  const getUserData = uid => {
    const db = getDatabase();
    const starCountRef = ref(db, 'NGUOIDUNG/' + uid);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      if (data.SoLuotHoi !== undefined) {
        setCount(data.SoLuotHoi);
      }
    });
  };

  const getHistoryData = () => {
    const db = getDatabase();
    const commentsRef = ref(db, `/LICHSU/${firebase.auth().currentUser.uid}`);

    onValue(commentsRef, snapshot => {
      if (snapshot.exists()) {
        const dataArray = [];
        snapshot.forEach(childSnapshot => {
          dataArray.push({
            key: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        setData(dataArray);
      }
    });

    return () => {
      // onValue();
    };
  };

  useEffect(() => {
    getUserData(firebase.auth().currentUser.uid);
    getHistoryData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <View style={styles.headerContainer}>
          <HeaderWithBack onPress={() => navigation.goBack()} title="History" />

          <View
            style={{
              width: '100%',
              height: 2,
              backgroundColor: CUSTOM_COLOR.Silver,
            }}
          />
        </View>
      </>

      {/* <>
        <View style={{height: 60, justifyContent: 'center', marginTop: 10}}>
          {hasSearch ? (
            <View
              style={{
                height: 50,
                marginHorizontal: 15,
                paddingHorizontal: 10,
                backgroundColor: CUSTOM_COLOR.White,
                borderRadius: 50,
                flexDirection: 'row',
                borderColor: isFocused
                  ? CUSTOM_COLOR.FruitSalad
                  : CUSTOM_COLOR.Silver,
                borderWidth: 1,
                alignItems: 'center',
              }}>
              <Image source={IC_Search} style={{width: 30, height: 30}} />
              <TextInput
                style={styles.textinputStyle}
                placeholder="Search"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
              />
              <TouchableOpacity
                onPress={() => {
                  setHasSearch(false);
                }}>
                <Image source={IC_clear} style={{width: 20, height: 20}} />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                height: 50,
                marginHorizontal: 25,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => setHasSearch(true)}
                style={{
                  backgroundColor: CUSTOM_COLOR.White,
                  padding: 5,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: CUSTOM_COLOR.Silver,
                }}>
                <Image source={IC_Search} style={{width: 30, height: 30}} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </> */}

      {/* <>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 15,
            justifyContent: 'flex-end',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Text style={{color: CUSTOM_COLOR.White, fontSize: 16}}>
            Total question:{' '}
          </Text>
          <Text
            style={{color: CUSTOM_COLOR.Red, fontSize: 18, fontWeight: 'bold'}}>
            {count}
          </Text>
        </View>
      </> */}

      <>
        <View style={{flex: 1, zIndex: 1, marginTop: 30, marginBottom: '20%'}}>
          <FlatList
            data={data}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'column',
                  // marginHorizontal: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: CUSTOM_COLOR.White,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('HistoryDetail', {data: item});
                  }}>
                  {item.HinhAnh && (
                    <Image
                      source={{uri: item.HinhAnh}}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        borderWidth: 1,
                        borderColor: CUSTOM_COLOR.Silver,
                        marginHorizontal: 10,
                      }}
                    />
                  )}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      marginHorizontal: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 10,
                          paddingVertical: 2,
                          color: CUSTOM_COLOR.Red,
                        }}>
                        ID: {item.key}
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
                          fontSize: 10,
                          paddingVertical: 2,
                        }}>
                        {item.ThoiGian}
                      </Text>
                    </View>
                    <Text style={{color: CUSTOM_COLOR.Black, maxHeight: 50}}>
                      {item.CauHoi}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    height: 2,
                    backgroundColor: CUSTOM_COLOR.Silver,
                  }}
                />
              </View>
            )}
          />
        </View>
      </>

      {/* <>
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
              position: 'relative',
              marginTop: -140,
            }}
          />
        </View>
      </> */}
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
  textinputStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 16,
    color: CUSTOM_COLOR.Black,
    flex: 1,
    marginHorizontal: 10,
  },
});
export default History;
