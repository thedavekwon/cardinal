import * as React from 'react';
import {  Alert,TouchableHighlight, ImageBackground,Image, Text, View, StyleSheet , Platform } from 'react-native';
import { Constants } from 'expo';
import { Overlay, Component, Button ,ButtonGroup} from 'react-native-elements';
import ResultScreen from './Result'
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 





export default class HomeScreen extends React.Component {
  

  render() {
 
    return (
      <View style={styles.container}>
     
       <ImageBackground source={require('./assets/main_bg.png')} style={{width: '101%', height: '100%',marginTop:'0%',justifyContent: 'center',
      alignItems: 'center'}}>
       <TouchableHighlight 
                
                  style={styles.submit}
                  onPress={() => {
                    this.props.navigation.dispatch(StackActions.reset({
                      index: 0,
                      actions: [
                      NavigationActions.navigate({ routeName: 'Details' })
                      ],
                    }))
                  }}
                >
                  <Image style={styles.button_rn} source={require('./assets/Main_to_detail.png')}/>
      </TouchableHighlight>

        <View style={styles.bottom_menu}>
           <TouchableHighlight style={[styles.menu_element,{bottom:'73%',marginLeft:'12%'}]}>
                <Image  source={require('./assets/progress.png')}/>
            </TouchableHighlight>
           <TouchableHighlight style={[styles.menu_element,{bottom:'70%',marginLeft:'45%'}]}>
                <Image  source={require('./assets/run.png')}/>
            </TouchableHighlight>     
           <TouchableHighlight  style={[styles.menu_element,{marginLeft:'79%'}]} >
                <Image source={require('./assets/gear.png')}/>
            </TouchableHighlight>
        </View>
           
        <View style={styles.rectangle} />
                      
          </ImageBackground>
      </View>
  
      );
  }
}


const styles = StyleSheet.create({
  
  bottom_menu:{
    position:'absolute',
    width:'100%',
    height: '12%',
    bottom:'-5%',
  },
  menu_element:{
    position:'absolute',
    width:'33%',
    
  },
  
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   submit:{
     alignItems:'center',
    underlayColor:'white',
    position:'absolute',
    bottom:'14%',
    
  },
  button_rn:{
      
      resizeMode:"contain",
      resizeMethod:'scale',
  },
});

