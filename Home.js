import * as React from 'react';
import { Linking, NativeModules, Alert, TouchableHighlight, ImageBackground, Image, Text, View, StyleSheet , Platform } from 'react-native';
import { Overlay, Component, Button ,ButtonGroup} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import './config';
const SpotifyModule = NativeModules.SpotifyModule;

export default class HomeScreen extends React.Component {
  componentDidMount() {
    SpotifyModule.initWithCredentials("b9b0379db0aa4804abed693b28f7d453", "cardinal://callback", ['streaming'], (error, message)=>{
        if(error){
          console.tron.log(error);
        }
        else {
          console.tron.log(message);
          Linking.getInitialURL().then((url) => {
              if (url) {
              console.log('Initial url is: ' + url);
            }
          }).catch(err => console.error('An error occurred', err));
        }
      });
      this.connectSpotify();
  }

  connectSpotify() {
    SpotifyModule.loggedIn((res) => {
      console.tron.log(res)
      if(!res) {
        SpotifyModule.startAuthenticationFlow((error) => {
            if(error){
              console.tron.log(error);
            }
          });
      } else {
        console.tron.log(res);
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
       <ImageBackground
         source={require('./assets/main_bg.png')}
         style={{width: '101%', height: '100%',marginTop:'0%',justifyContent: 'center',
         alignItems: 'center'}}>
       <TouchableHighlight
          style={styles.submit}
          underlayColor='white'
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'Details' })
              ],
            }))
          }}
        >
        <Image style={styles.button_rn} resizeMethod='scale' source={require('./assets/Main_to_detail.png')}/>
      </TouchableHighlight>

        <View style={styles.bottom_menu}>
           <TouchableHighlight style={[styles.menu_element,{bottom:'77%',marginLeft:'13%'}]}>
                <Image  source={require('./assets/progress.png')}/>
            </TouchableHighlight>
           <TouchableHighlight style={[styles.menu_element,{bottom:'73%',marginLeft:'47%'}]}>
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
    position:'absolute',
    bottom:'14%',

  },
  button_rn:{
    resizeMode:"contain",
  },

});
