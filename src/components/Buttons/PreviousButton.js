import React from 'react';
import {IC_back} from '../../assets/icons/index.js';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';

class PreviousButton extends React.Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image source={IC_back} style={{resizeMode: 'contain'}} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default PreviousButton;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
