import React, {Component} from 'react';
import {AppState, Alert, Button, Platform, StyleSheet, Text, View, Dimensions, Linking, TouchableHighlight} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import './config';
import { Path } from 'react-native-svg'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import { NativeEventEmitter, NativeModules } from 'react-native';

const SpotifyModule = NativeModules.SpotifyModule;

let start = new Date().toISOString();
let optionss = {
    permissions: {
        read: ["HeartRate"]
    }
};

const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                fill={'none'}
            />
)

export default class App extends Component {
  state = {messages:[60, 61, 62], interval:true, stop:false}
  workerThread = null;

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
      }, 10000);
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

  searchSpotify() {
    console.tron.log(SpotifyModule)
    SpotifyModule.performSearchWithQuery('highlyspecificplaylistname','playlist',0,'US', (err, res)=>{
      console.tron.log('error', err);
      //console.tron.log('result', res);
    });
  }

  metaData() {
    SpotifyModule.metadata((res)=>{console.tron.log(res);});
    SpotifyModule.playbackState((res)=>{console.tron.log(res);});
  }

  componentWillUnmount() {
    subscription.remove()
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.connectSpotify()} title="login spotify" />
        <Button onPress={() => this.startFetch()} title="start" />
        <Button onPress={() => this.stopFetch()} title="stop" />
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            SpotifyModule.playSpotifyURI("spotify:playlist:1GBhsczzQEPpCvw2HgsvKh", 0, 0.0,(error)=>{
            //SpotifyModule.playSpotifyURI("spotify:track:12x8gQl2UYcQ3tizSfoPbZ", 0, 0.0, (error) => {
              if(error) {
                console.tron.log('Something went wrong')
              }
            });
          }}
        >
          <Text style={styles.btnSong}>
            Spotify Playlist
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            SpotifyModule.playbackState((res) => {
              if(res.isPlaying) {
                SpotifyModule.setIsPlaying(false, (err) => {
                  if(err){
                    console.tron.log('Pause', err);
                  }
                });
              } else {
                SpotifyModule.setIsPlaying(true, (err) => {
                  if(err){
                    console.tron.log('Play', err);
                  }
                });
              }
            })
          }}>
          <Text style={styles.btnText}>
            Play/Pause
          </Text>
        </TouchableHighlight>

        <View>
           <AreaChart
               style={{ height: 200 }}
               data={this.state.messages}
               contentInset={{ top: 30, bottom: 30 }}
               curve={shape.curveNatural}
               svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}>
               <Grid/>
               <Line/>
           </AreaChart>
        </View>
        <View>
          <Text>Messages:</Text>
          {this.state.messages.map((message, i) => <Text>{message}</Text>)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 45,
    borderRadius: 64
  },
  image: {
    width: 250,
    height: 50
  },
  normalText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  btnSong: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
});
