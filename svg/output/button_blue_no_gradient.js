import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import BigButtonCopy4 from './button_blue_no_gradient_images/BigButtonCopy4.png'

export default class Main extends Component {

  render() {
    return (
      <ScrollView style={{
        flex: 1, alignSelf: 'stretch', 
        paddingTop: 20,
        backgroundColor: '#ffffff'}}>
        <Image source={BigButtonCopy4} style={styles.BigButtonCopy4} />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  BigButtonCopy4: {

  }
})
