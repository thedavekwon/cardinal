import * as React from 'react';
import { TouchableHighlight, ImageBackground,Image, Text, View, StyleSheet , Platform } from 'react-native';
import { Constants } from 'expo';
import { Button } from 'react-native-elements';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
     
       <ImageBackground source={require('./assets/main_bg.png')} style={{width: '100%', height: '100%'}}>
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
                  <Image style={{resizeMode:'contain', margin:'0'}} source={require('./assets/Main_to_detail.png')}/>
              </TouchableHighlight>
          </ImageBackground>
      </View>
  
      );
  }
}


class DetailsScreen extends React.Component {
    state = {calories:"60",heartrate:"130",artist:'Utada Hikaru',song:"simple and clean",bpm:"130",
                timer: null,
                counter: '00',
                miliseconds: '00',
                startDisabled: true,
                stopDisabled: false
          }
  
   constructor(props)
    {
        super(props);
        
        this.onButtonStart = this.onButtonStart.bind(this);
        this.onButtonStop = this.onButtonStop.bind(this);
        this.onButtonClear = this.onButtonClear.bind(this);
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.counter;

            if( Number(this.state.miliseconds) == 99 ) {
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }

            self.setState({
                counter: count.length == 1 ? '0'+count : count,
                miliseconds: num.length == 1 ? '0'+num : num
            });
        }, 0);
        this.setState({timer});
    }

    onButtonStart() {
        this.start();
        this.setState({startDisabled: true, stopDisabled: false});
    }


    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({startDisabled: false, stopDisabled: true});
    }


    onButtonClear() {
        this.setState({
            timer: null,
            counter: '00',
            miliseconds: '00'
        });
    }

  render() {
    return (
          
           <View style={styles.rn_container} >
              <ImageBackground source={require('./assets/running_bg.png')} style={{width: '100%', height: '100%'}}>
                {this.state.counter}
                {this.state.miliseconds}
                
                    <button title="Start" disabled="disabled"></button>
                    <button title="Stop" disabled="disabled"></button>
                    <button title="Clear" disabled="disabled"></button>
              <Text style={[styles.generic,styles.textalign,styles.letter_class2,{zIndex:0}]}>00:23</Text>

                <View style={styles.heart_container}> 

                  <View style={[styles.md_left]}>
                    
                    <Text style={[styles.generic,styles.letter_class1,{paddingLeft:'5%',paddingBottom:'28%'}]} ><Image source={require('./assets/heart.png')}/>{this.state.heartrate}
                    </Text>
                  </View>

                  <View style={[styles.md_right]}>
                    <Text style={[styles.generic,styles.letter_class1]}>{this.state.calories+" Cal"}</Text>
                  </View>

                </View>
               
              <View style={styles.md_Container}>
                <View style={styles.md_left}>
                  <Text style={[styles.generic,styles.letter_class3]}>{this.state.artist}</Text>
                  <Text style={[styles.generic,styles.letter_class3]}>{this.state.song}</Text>
                  <Text style={[styles.generic,styles.letter_class3]}>{"BPM: " + this.state.bpm}</Text>
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
                      NavigationActions.navigate({ routeName: 'Home' })
                      ],
                    }))
                  }}
                >
                  <Image style={styles.button_rn} source={require('./assets/BBcopy4.png')}/>
              </TouchableHighlight>

            
            </ImageBackground>
          </View>

    );
  }  
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
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
  rn_container:{
    textAlign: 'auto'
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
  submit:{
    underlayColor:'white',
    position:'absolute',
    bottom:'18%',
    
  },

  button_rn:{
      position:'absolute',
      resizeMode:"contain",
      resizeMethod:'scale',
      marginRight: "-1.25%",
      marginLeft: "1.25%",
      margin:'1.5%'},
  

  letter_class1:{ fontSize:29,  fontWeight: 'bold'},
  letter_class2:{  fontSize:102,  fontWeight: 'bold'},
  letter_class3:{ fontSize:15, fontWeight:'bold'},
  generic:{
    color:'white',
    padding:'1%'
  },
  textalign:{
  alignContent:'center',
  margin:"10%",
  top:'12%'
  }
});

export default createAppContainer(AppNavigator);