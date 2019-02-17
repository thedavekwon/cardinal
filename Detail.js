import * as React from 'react';
import { Alert,TouchableHighlight, ImageBackground,Image, Text, View, StyleSheet , Platform } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-elements';
import ResultScreen from './Result'
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 



export default class DetailScreen extends React.Component {
    state = {calories:"60",heartrate:"130",artist:'Utada Hikaru',song:"Simple and Clean",bpm:"130",
                timer: null,
                mili: '00',
                seco: '00',
                startDisabled: true,
                stopDisabled: false
          }
  
   constructor(props)
    {
        super(props);
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
   
    start() {
        var start = Date.now();
        var self = this;
        let timer = setInterval(() => {
        var delta = Date.now() - start,
        counter = Math.floor(delta / 1000).toString(); 

       

        self.setState({
          seco: counter!=0 && counter%60 ==0 ? (counter/60 >= 10 ? (counter/60).toString(): '0'+(counter/60).toString()  ) : this.state.seco ,

          mili: counter%60 ==0 ? '00' : (counter%60 < 10 ?  '0'+(counter%60).toString():(counter%60).toString()  )

        });}, 1000)    ;

        this.setState({timer});
 
    }

    

  render() {
    return (    
      <View style={styles.container} >
        <ImageBackground source={require('./assets/running_bg.png')} style={{width: '100%', height: '100%', justifyContent: 'center',
      alignItems: 'center'}}>
          
                <View style={styles.heart_container}> 
                  <View style={[styles.md_left2]}>              
                    <Text style={[styles.generic,styles.letter_class1,{paddingLeft:'5%'}]} ><Image source={require('./assets/heart.png')}/>{this.state.heartrate}
                    </Text>
                  </View>

                  <View style={[styles.md_right2]}>
                    <Text style={[styles.generic,styles.letter_class1,{marginTop:'5%'}]}>{this.state.calories+" Cal"}</Text>
                  </View>

                </View>

              <Text style={[styles.generic,styles.textalign,styles.letter_class2,{top:"-25%"}]}>{this.state.seco + ":" + this.state.mili}</Text>
                
          
              <View style={styles.md_Container}>
                <View style={styles.md_left}>
                  <Text style={[styles.generic,styles.letter_class3]}>{this.state.artist}</Text>
                  <Text style={[styles.generic,styles.letter_class3]}>{this.state.song}</Text>
                  <Text style={[styles.generic,styles.letter_class3,{color:"#6B8EAB"}]}>{ this.state.bpm +" BPM"}</Text>
                </View>

                <View style={styles.md_right}>
                  <Image source={require('./assets/shuffle.png')}/>
                </View>
              </View>

              <TouchableHighlight
                
                  style={styles.submit}
                  onPress={() => {
                    this.props.navigation.dispatch(StackActions.reset({
                      index: 0,
                      actions: [
                      NavigationActions.navigate({ routeName: 'Result' })
                      ],
                    }))
                  }}
                >
                  <Image style={styles.button_rn} source={require('./assets/return.png')}/>
              </TouchableHighlight>

            
            </ImageBackground>
          </View>

    );
  }  
}



const styles = StyleSheet.create({
  container: {
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
 
 
  heart_container:{
    position:'absolute',
    width:'100%',
    top:'11%',
    zIndex :1000
  },
  md_Container:{
    position:'absolute',
    width:'100%',
    bottom: '36%'
  },
  md_left:{
    position:'absolute',
    alignSelf:'flex-start',
    marginLeft:'3%'},
  md_right:{
    position:'absolute',

    alignSelf:'flex-end', 
    marginRight:'3%',
  },
  md_left2:{
    position:'absolute',
    alignSelf:'flex-start',
    marginLeft:'20%'},
  md_right2:{
    position:'absolute',
    alignContent:'flex-end', 
    right:'20%',
  },
  submit:{
    underlayColor:'white',
    position:'absolute',
    bottom:'7%',
    
  },

  button_rn:{
      resizeMode:"contain",
      resizeMethod:'scale',
      margin:'3%'
    
     },
  

  letter_class1:{ fontSize:27,  },
  letter_class2:{  fontSize:95,  fontWeight: 'bold'},
  letter_class3:{ fontSize:15, fontWeight:'bold'},
  generic:{
    color:'white',
    padding:'1%'
  },
  textalign:{
  alignContent:'center',
  margin:"11%",
  marginLeft:"13.5%",
  top:'12%'
  }
});