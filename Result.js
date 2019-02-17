import * as React from 'react';
import { Alert,TouchableHighlight, ImageBackground,Image, Text, View, StyleSheet , Platform } from 'react-native';
import { Button } from 'react-native-elements';
import {StackActions, NavigationActions } from 'react-navigation';
import { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(47, 113, 242)'}
                fill={'none'}
            />
)
const Gradient = ({ index }) => (
    <Defs key={index}>
        <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
            <Stop offset={'0%'} stopColor={'rgb(255, 225, 255)'} stopOpacity={0.8}/>
            <Stop offset={'100%'} stopColor={'rgb(0, 0, 0)'} stopOpacity={0.3}/>
        </LinearGradient>
    </Defs>
)

export default class ResultScreen extends React.Component {
  state = {calories:"157",heartrate:"130",artist:'Utada Hikaru',totTime:"17:56",bpm:"130",}
  constructor(props) {
    super(props);
    this.calories = this.props.navigation.getParam('calories')
    this.min = this.props.navigation.getParam('min')
    this.sec = this.props.navigation.getParam('sec')
    this.heartrates = this.props.navigation.getParam('heartrates')
    this.avg = Math.floor(this.heartrates.reduce((a,b)=>a+b, 0)/this.heartrates.length);
  }

  componentDidMount() {
    this.setState({
      calories:this.calories,
      heartrate:this.avg,
      totTime:this.min+":"+this.sec,
    });
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

            <View style={{top:'10%'}}>
              <AreaChart
                 style={{ height: 200 , width:414}}
                 data={ this.heartrates }
                 contentInset={{ top: 30, bottom: 30 }}
                 curve={ shape.curveNatural }
                 stroke={ 'rgb(47, 113, 242)' }
                 extras={[ Gradient ]}
                 svg={{
                      fill:'url(#gradient)',
                      strokeWidth: 10,
                  }}
                 yMin={60}
                 yMax={150}>
                 <Line/>
              </AreaChart>
            </View>

            <TouchableHighlight
                style={styles.submit}
                underlayColor='white'
                onPress={() => {
                  this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                    ],
                  }))
                }}
              >
              <Image style={styles.button_rn} resizeMethod='scale' source={require('./assets/return_button.png')}/>
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
      margin:'5%'
  },
  submit:{
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
