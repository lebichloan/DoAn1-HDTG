import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CUSTOM_COLOR from '../../constants/colors.js';
import FONT_FAMILY from '../../constants/fonts.js';

class NavigateButton extends React.Component {
  render() {
    // const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.textButton}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NavigateButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: CUSTOM_COLOR.FruitSalad,
  },
  textButton: {
    fontFamily: FONT_FAMILY.SemiBold,
    fontSize: 16,
    color: CUSTOM_COLOR.White,
  },
});
