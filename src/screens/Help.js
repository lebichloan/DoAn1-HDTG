import React from 'react';
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

const Help = props => {
  const {navigation} = props;

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
          Help
        </Text>
        <Text style={{fontSize: 13, marginBottom: 25}}>
          {/* You can edit your profile here */}
        </Text>
      </>

      <>
        <ScrollView style={{height: '30%', marginBottom: 25, paddingRight: 15}}>
          <Text style={{fontSize: 14}}>
            Đây là một ứng dụng được xây dựng nhằm phục vụ cho đồ án môn học của
            chúng tôi và ứng dụng này sử dụng một model Visual Question Answer
            đơn giản và chủ yếu là nhưng câu hỏi và câu trả lời tập chung vào
            chủ đề màu sắc. Để sử dụng ứng dụng bạn chỉ cần tạo tài khoản với
            địa chỉ email và đăng nhập vào hệ thống để sử dụng. Bạn chỉ cần đưa
            một bức ảnh mà bạn muốn hỏi đáp và nhập câu hỏi và gửi lên, sau vài
            giây app sẽ đưa ra câu trả lời tương ứng với câu hỏi. Mọi thắc mắc
            hay đóng góp xin vui lòng liên hệ qua điện thoại hoặc tin nhắn
            0379361210.
          </Text>
        </ScrollView>
      </>

      <>
        <View style={styles.buttonContainer}>
          <NavigateButton text="I got it" onPress={() => navigation.goBack()} />
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
export default Help;
