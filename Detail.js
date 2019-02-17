import * as React from 'react';
import { NativeEventEmitter, NativeModules, Alert, TouchableHighlight, ImageBackground,Image, Text, View, StyleSheet , Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import AppleHealthKit from 'rn-apple-healthkit';
import './config';

const bpms = {
  bpm80 : [
    {
      title: "Simple and Clean",
      artist: "Utada Hikaru",
      bpm: 88,
      uri: "spotify:track:2G8tfTExxzpRKssKzKwDYV"
    },
    {
      title: "You Will Be Found",
      artist: "Ben Platt",
      bpm: 87,
      uri: "spotify:track:1H7Zqkq54andtaSSnLRrfp"
    },
    {
      title: "See You Again",
      artist: "Wiz Khalifa",
      bpm: 80,
      uri: "spotify:track:2JzZzZUQj3Qff7wapcbKjc"
    }],
  bpm90 : [
    {
      title: "First Love",
      artist: "Utada Hikaru",
      bpm: 90,
      uri: "spotify:track:39HrUxcvKF3jtLz7fUDWXc"
    },
    {
      title: "Sincerely Me",
      artist: "Mike Faist",
      bpm: 98,
      uri: "spotify:track:4nna9JONFIwr98bcX6tlta"
    },
    {
      title: "For Forever",
      artist: "",
      bpm: 96,
      uri: "spotify:track:0ZWW07BD8W85lUbgx2sn7E"
    }],
  bpm100 : [
    {
      title: "Passion",
      artist: "Utada Hikaru",
      bpm: 109,
      uri: "spotify:track:5r7TMSzxsHDLgqAGgJaD8r"
    },
    {
      title: "Attention",
      artist: "Charlie Puth",
      bpm: 100,
      uri: "spotify:track:5cF0dROlMOK5uNZtivgu50"
    },
    {
      title: "Hey Look Ma, I Made It",
      artist: "Panic at The Disco",
      bpm: 108,
      uri: "spotify:track:22oEJW6r2rMb9z4IntfyEa"
    }],
  bpm110 : [
    {
      title: "How Long",
      artist: "Charlie Puth",
      bpm: 110,
      uri: "spotify:track:6wmAHw1szh5RCKSRjiXhPe"
    },
    {
      title: "Traveling",
      artist: "Utada Hikaru",
      bpm: 117,
      uri: "spotify:track:6OxxzC0HsX7zK3ZO3q79H6"
    },
    {
      title: "Wait and See",
      artist: "Utada Hikaru",
      bpm: 118,
      uri: "spotify:track:4JR5kgASeP9FnetbS19sjN"
    }],

  bpm120 : [
    {
      title: "Nervous",
      artist: "Shawn Mendes",
      bpm: 122,
      uri: "spotify:track:5wxurz8J6YlyQRNnGN8zXS"
    },
    {
      title: "New Light",
      artist: "John Mayer",
      bpm: 124,
      uri: "spotify:track:3bH4HzoZZFq8UpZmI2AMgV"
    },
    {
      title: "Defying Gravity",
      artist: "Idina Menzel",
      bpm: 128,
      uri: "spotify:track:1bpnYrDCforv9ctJMzJRV8"
    }],

  bpm130 : [
    {
      title: "Death of a Bachelor",
      artist: "Panic At the Disco!",
      bpm: 139,
      uri: "spotify:track:1BECwm5qkaBwlbfo4kpYx8"
    },
    {
      title: "Let It Go",
      artist: "Idina Menzel",
      bpm: 130,
      uri: "spotify:track:0qcr5FMsEO85NAQjrlDRKo"
    },
    {
      title: "Kiss the Girl",
      artist: "The Little Mermaid",
      bpm: 135,
      uri: "spotify:track:6CDiKAFgbWXlwQTU59GKYT"
    }],

  bpm140 : [
    {
      title: "Waving Through a Window",
      artist: "Ben Platt",
      bpm: 146,
      uri: "spotify:track:0gMW8XpPFPjoApDii5Tj1u"
    },
    {
      title: "In My Blood",
      artist: "Shawn Mendes",
      bpm: 140,
      uri: "spotify:track:2QZ7WLBE8h2y1Y5Fb8RYbH"
    },
    {
      title: "The Mob Song",
      artist: "Beauty And The Beast",
      bpm: 143,
      uri: "spotify:track:7qdZkwv9cRRljOcQjwx1Z9"
    }],

  bpm150 : [
    {
      title: "Holding Out For a Hero",
      artist: "Glee Cast",
      bpm: 150,
      uri: "spotify:track:1s2oaFmwwlQmhrsv4NrN0t"
    },
    {
      title: "America",
      artist: "West Side Story",
      bpm: 159,
      uri: "spotify:track:1RZ6jzlPeEaDeKYe7IJ792"
    },
    {
      title: "The Good, the Bad and the Dirty",
      artist: "Panic At The Disco!",
      bpm: 156,
      uri: "spotify:track:5eoZTdiq4C4aoEfUwAN0ha"
    }],

  bpm160 : [
    {
      title: "The Greatest Show",
      artist: "Hugh Jackman",
      bpm: 160,
      uri: "spotify:track:4ylWMuGbMXNDgDd8lErEle"
    },
    {
      title: "Don't Let Me Down",
      artist: "The Chainsmokers",
      bpm: 160,
      uri: "spotify:track:1i1fxkWeaMmKEB4T7zqbzK"
    },
    {
      title: "Say Amen (Saturday Night)",
      artist: "Panic At The Disco!",
      bpm: 168,
      uri: "spotify:track:76vMKwFtdDDCLcM6zXybjB"
    }]
}

const SpotifyModule = NativeModules.SpotifyModule;
const spotifyEvent = new NativeEventEmitter(SpotifyModule);
const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(236, 156, 137)'}
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

let optionss = {
    permissions: {
        read: ["HeartRate"]
    }
};

export default class DetailScreen extends React.Component {
    state = {calories:"0",heartrate:"---",artist:'Utada Hikaru',song:"Simple and Clean",bpm:"130",
              timer: null,
              mili: '00',
              seco: '00',
              startDisabled: true,
              stopDisabled: false,
              messages: [80, 80],
              interval: true,
              stop: false,
              currentlist:[],
              change: false
            }

    constructor(props) {
        super(props);
        this.start = this.start.bind(this);
        let subscription = undefined
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

    queueSpotify(object) {
      SpotifyModule.queueSpotify(object['uri'], (error)=>{
      //SpotifyModule.playSpotifyURI("spotify:track:12x8gQl2UYcQ3tizSfoPbZ", 0, 0.0, (error) => {
        if(error) {
          console.tron.log('Something went wrong')
        }
        this.setState({
          song:object['artist'],
          artist:object['title'],
          bpm:object['bpm']
        })
      })
    }

    playSpotify(object) {
      SpotifyModule.playSpotifyURI(object['uri'], 0, 0.0,(error)=>{
      //SpotifyModule.playSpotifyURI("spotify:track:12x8gQl2UYcQ3tizSfoPbZ", 0, 0.0, (error) => {
        if(error) {
          console.tron.log('Something went wrong')
        }
        this.setState({
          song:object['artist'],
          artist:object['title'],
          bpm:object['bpm']
        })
      })
    }

    shuffleSpotify(list) {
      if (list === undefined || list.length == 0) return;
      console.tron.log(list);
      this.setState({change:true})
      SpotifyModule.playbackState((res) => {
        if(res.isPlaying) {
          SpotifyModule.setIsPlaying(false, (err) => {
            if(err){
              console.tron.log('Pause', err);
            }
          });
        }
      })
      const selected = list[Math.floor(Math.random() * list.length)];
      this.playSpotify(selected);
      this.setState({currentlist:list, change:false});
    }

    componentDidMount() {
        this.start();
        this.startFetch();
        this.connectSpotify();
        this.shuffleSpotify(bpms['bpm80']);
        this.subscription = spotifyEvent.addListener(
          'didChangePlaybackStatus',
          (ret) => {
            if(!ret['isPlaying'] && !this.state.change) {
              let lastbpm = this.state.messages[this.state.messages.length - 1];
              lastbpm = (Math.round(lastbpm/10)*10).toString()
              console.tron.log("bpm"+lastbpm);
              let key = bpms["bpm"+lastbpm];
              console.tron.log(key);
              this.shuffleSpotify(key);
            }
          }
        )
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    startFetch() {
      start = (new Date()).toISOString();
      this.setState({stop:false});
      setInterval(() => {
          if (!this.state.stop) {
            this.setState(previousState => (
              {interval: !previousState.interval }
            ))
            this.getHealthData()
          }
          //SpotifyModule.playbackState((res) => console.tron.log(res));
          /*SpotifyModule.playbackState((res) => {
            if(!res.isPlaying) {
              let lastbpm = this.state.messages[this.state.messages.length - 1];
              lastbpm = (Math.round(lastbpm/10)).toString()
              let key = window["bpm"+lastbpm];
              this.shuffleSpotify(key);
            }
          })*/
        }, 5000);
    }

    stopFetch() {
      this.setState({stop:true, messages:[]});
    }

    getHealthData() {
      let heartOption = {
        startDate:start,
        endDate:(new Date()).toISOString(),
        unit: 'bpm', // optional; default 'bpm'
        ascending: false, // optional; default false
        limit:100, // optional; default no limit
      };
      AppleHealthKit.initHealthKit(optionss, (err, results) => {
        if (err) {
            console.tron.log("error initializing Healthkit: ", err);
            return;
        }
        AppleHealthKit.getHeartRateSamples(heartOption, (err, results) => {
          if (err) {
            console.tron.log(err)
            return;
          }
          if(results.length) {
            console.log(results)
            this.setState(state => {
              return { messages: [...state.messages, parseInt(results[0]['value'], 10)]};
            });
          }
        });
      });
    }

    start() {
        var start = Date.now();
        var self = this;
        let timer = setInterval(() => {
        var delta = Date.now() - start,
        counter = Math.floor(delta / 1000).toString();
        self.setState({
          seco: counter!=0 && counter%60 ==0 ? (counter/60 >= 10 ? (counter/60).toString(): '0'+(counter/60).toString()  ) : this.state.seco ,
          mili: counter%60 ==0 ? '00' : (counter%60 < 10 ?  '0'+(counter%60).toString():(counter%60).toString()),
          calories: (Math.max(0, Math.floor(((25 * 0.2017) - (160 * 0.09036) + (this.state.messages.reduce((a,b)=>a+b, 0)/this.state.messages.length * 0.6309) - 55.0969) * parseInt(this.state.seco,10) / 4.184))).toString()
        });}, 1000);
        this.setState({timer});
  }

  render() {
    return (
      <View style={styles.container} >
        <ImageBackground source={require('./assets/running_bg.png')} style={{width: '100%', height: '100%', justifyContent: 'center',
      alignItems: 'center'}}>
              <View style={styles.heart_container}>
                <View style={[styles.md_left2]}>
                  <Text style={[styles.generic,styles.letter_class1,{paddingLeft:'5%'}]} ><Image source={require('./assets/heart.png')}/>{this.state.messages[this.state.messages.length-1]}
                  </Text>
                </View>
                <View style={[styles.md_right2]}>
                  <Text style={[styles.generic,styles.letter_class1,{marginTop:'5%'}]}>{this.state.calories+" Cal"}</Text>
                </View>
              </View>

              <Text style={[styles.generic,styles.textalign,styles.letter_class2,{top:'-13%'}]}>{this.state.seco + ":" + this.state.mili}</Text>
              <View style={{top:'-20%'}}>
                <AreaChart
                   style={{ height: 200 , width:414}}
                   data={ this.state.messages }
                   contentInset={{ top: 30, bottom: 30 }}
                   curve={ shape.curveNatural }
                   stroke={ 'rgb(236, 156, 137)' }
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
              <View style={styles.md_Container}>
                <View style={styles.md_left}>
                  <Text style={[styles.generic,styles.letter_class3]}>{this.state.artist}</Text>
                  <Text style={[styles.generic,styles.letter_class3]}>{this.state.song}</Text>
                  <Text style={[styles.generic,styles.letter_class3,{color:"#6B8EAB"}]}>{ this.state.bpm +" BPM"}</Text>
                </View>

                <View style={styles.md_right}>
                  <TouchableHighlight
                    underlayColor='white'
                    onPress={() => {
                      this.shuffleSpotify(this.state.currentlist);
                    }}>
                    <Image source={require('./assets/shuffle.png')}/>
                  </TouchableHighlight>
                </View>
              </View>

              <TouchableHighlight
                  style={styles.submit}
                  underlayColor='white'
                  onPress={() => {
                    this.subscription.remove();
                    this.setState({change:true});
                    SpotifyModule.playbackState((res) => {
                      if(res.isPlaying) {
                        SpotifyModule.setIsPlaying(false, (err) => {
                          if(err){
                            console.tron.log('Pause', err);
                          }
                        });
                      }
                    })
                    this.props.navigation.navigate(
                      'Result',{heartrates:this.state.messages, calories:this.state.calories, min:this.state.seco, sec:this.state.mili}
                    )
                  }}
                >
                  <Image style={styles.button_rn} resizeMethod='scale' source={require('./assets/return.png')}/>
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
    position:'absolute',
    bottom:'7%',

  },

  button_rn:{
      resizeMode:"contain",
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
