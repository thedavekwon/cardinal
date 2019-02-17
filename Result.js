import * as React from 'react';
import { Alert,TouchableHighlight, ImageBackground,Image, Text, View, StyleSheet , Platform } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-elements';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 


export default class ResultScreen extends React.Component {

  state = {calories:"157",heartrate:"130",artist:'Utada Hikaru',totTime:"17:56",bpm:"130",
             
          }
  
  render() {
    return (


      <View style={[styles.container]}>
            <View style={[styles.screentitle]}>
              <Text style={[styles.generic,styles.letter_class2]}>Workout Summary</Text>
            </View> 
            <View style={styles.stats}>
            
                  <View style={styles.leftside}>
                    <Text style={[styles.text_blue,styles.letter_class1]}>{this.state.heartrate}</Text>
                    <Text style={[styles.letter_class3,styles.generic,{padding:"2%"}]}>Average {"\n"}Heartrate</Text>
                  </View>
                  
                  <View style={styles.rightside}>

                        <View style={styles.rightTime}>
                          <Text style={[styles.text_blue,styles.letter_class2]}>{this.state.totTime }</Text>
                          <Text style={[styles.letter_class3,styles.generic]}>Time</Text>
                        </View>

                        <View style={styles.rightCal}>
                          <Text style={[styles.text_blue,styles.letter_class2]}>{this.state.calories}</Text>
                          <Text style={[styles.letter_class3,styles.generic]}>Calories</Text>
                        </View>

                  </View>
            </View>
            
            <TouchableHighlight      
                style={styles.submit}
                onPress={() => {
                  this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                    ],
                  }))
                }}
              >
              <Image style={styles.button_rn} source={require('./assets/return_button.png')}/>
              </TouchableHighlight>     
      </View>
  
      );
  }
}


const styles = StyleSheet.create({
  stats:{
    position:'absolute',
    width:"100%",
    height:'30%',
   
    top:"15%",
  },
  screentitle:{
    position:'absolute',
    left:"5%",
    top:"7%",
    
  },
  text_blue:{
    color:"#3372ED"
  },
  leftside:{
    position:'absolute',
    width:"50%",
   height:"100%",
    alignSelf:"flex-start",
    marginLeft:'6%',
    marginTop:'-4%'

  },

  rightside:{
    position:'absolute',
    width:"50%",
    height:"100%",
    alignSelf:"flex-end",
    marginRight: '-16%'
  },

  rightTime:{
    position:'absolute'
  },
  rightCal:{
    position:'absolute',
    top:"27%"
  },

  container: {
    width:"100%",
    height:"100%",
    justifyContent: 'center',
      alignItems: 'center',
    backgroundColor:'#171D23'
  },
  button_rn:{
      resizeMode:"contain",
      resizeMethod:'scale',
      margin:'5%'
  },
  submit:{
    underlayColor:'white',
    position:'absolute',
    bottom:'10%',
    
  },
  generic:{
    color:'#FFFFFF',
    padding:'2%'
  },

   letter_class1:{ fontSize:80,  fontWeight: 'bold'},
  letter_class2:{  fontSize:26,  fontWeight: 'bold'},
  letter_class3:{ fontSize:20, fontWeight:'bold'},
});

