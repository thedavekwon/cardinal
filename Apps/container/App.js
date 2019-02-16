/**
 *
 * React CARDINAL
 * React-native-svg
 * React-native-navigatoin
 * 
 */

import React, {Component} from 'react';

import {TouchableOpacity,Button, Alert, Platform, StyleSheet, Text, View, Image} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
     
       <Button
            title="Results"
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Details' })
                ],
              }))
            }}
          /> 
      </View>
  
      );
  }
}


class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{    
        
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',}}>
          <Image
            style={{
            
            width: "100%", height: "100%" }}
            source={require('../assets/Rectangle.png')}
            />
        
          <Button
            style={{position:"absolute"}}
            title="Return Home"
            onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' })
                ],
              }))
            }}
          /> 
        
      </View>
    );
  }  
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details:{
    screen: DetailsScreen,
    navigationOptions: {
      header: null,
    }
  },
},{ 
  initialRouteName: 'Home',
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default createAppContainer(AppNavigator);