import React from 'react';
import {StyleSheet, Text} from 'react-native';
import FONT_FAMILY from '../../constants/fonts';
import CUSTOM_COLOR from '../../constants/colors';

const Title = props => {
  return <Text style={styles.titleView}>{props.title}</Text>;
};
const styles = StyleSheet.create({
  titleView: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: 30,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});
export default Title;

// Header screeen 5,7,8,9
