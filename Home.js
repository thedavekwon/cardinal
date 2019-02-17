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
  state = {runmode:'FAT BURN',goalmode:'150 CAL'}

  render() {
 
    return (
      <View style={styles.container}>
     
       <ImageBackground source={require('./assets/main_bg.png')} style={{width: '101%', height: '100%',marginTop:'0%',justifyContent: 'center',
      alignItems: 'center'}}>
      <View style={{flex:1,flexDirection: 'row',justifyContent:'space-between',marginTop:'10%'}}>
         <View ><Image  source={require('./assets/phoneshake.png')}/></View>
          <View ><Image  source={require('./assets/choice.png')}/></View>
      </View> 
        <Image style={styles.button_rn,{bottom:'-21%'}} source={require('./assets/Main_Dock.png')}/>

        <View style={{flex:1,flexDirection: 'row',alignContent:'center'}}>
          <View style={{marginLeft:'-20%',bottom:'-37%'}} >
                  <Image source={require('./assets/icon_program.png')}/>
                  <Text style={{position:'absolute',width:150,color:'white',paddingLeft:'25%'}}>{this.state.runmode}</Text>
          </View>
          <View style={{marginLeft:'35%',marginRigth:'30%',bottom:'-38%'}}>
                  <Image style={{position:'absolute'}} source={require('./assets/icon_goal.png')}/>
                 <Text style={{position:'absolute',width:150,color:'white',paddingLeft:'25%'}}>{this.state.goalmode}</Text>
          </View>
        </View>
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
           <TouchableHighlight style={[styles.menu_element,{bottom:'77%',marginLeft:'13%'}]}>
                <Image  source={require('./assets/progress.png')}/>
            </TouchableHighlight>
           <TouchableHighlight style={[styles.menu_element,{bottom:'73%',marginLeft:'47%'}]}>
                <Image  source={require('./assets/run.png')}/>
            </TouchableHighlight>     
           <TouchableHighlight  style={[styles.menu_element,{bottom:'76%',marginLeft:'79%'}]} >
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


