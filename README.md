# Cardinal

## Intro

This project was created by Cooper Union students Do Hyung Kwon, Minyoung Na, Elvin Hu, and Evan Bubniak as part of the hackNYU 2019 hackathon, between February 15 and February 17.

Cardinal asks questions about your running background and goals, hooks into your Spotify library, and generates workout playlists based on your running goals.

## Purpose

60 million Americans go running every year to improve their physique and well-being. However, research has shown that 75% of people aren't sure whether they're running too much or too little to reach their goals. If too little, there might not be enough effect, and if too much, there might be risk of injuries.

In addition, users tend to respond to fast-paced music by speeding up, and slower-paced music by slowing down. Currently available exercise apps take advantage of this by offering DJ-curated playlists to help users meet their running goals, but according to our research, more than 80% of users don't want to listen to DJ-curated playlists, especially people whose tastes fall outside of the US top-40 hits, and they don't want to feel pigeonholed into certain demographics. Polls and interviews we conducted during the hackathon demonstrates that people want to listen to their own music when they're running.

Furthermore, users often take up running with goals in mind: for instance, increasing their endurance, lowering their resting heart rate, or burning calories, but they don't know how to reach their goals. That's why we're here to help. 

## Functionality

When the user starts an exercise session on the app, the app offers the following features: 
* a real-time graph of their heart rate,
* start an exercise stopwatch,
* begin playback of a playlist tailored to the chosen workout which is generated on the fly from their own music library based on the length of the work out and user's goal and their target heart rate.

## Implementation

This project uses react-native, react-native-elements, react-native-svg, react-native-spotify,  react-navigation, rn-apple-healthkit, d3-shape, and expo.

### How we generate playlists

We generate playlists based on a pre-defined workout format, which lets us choose tracks based on their length and BPM, such that the flow of the currently playing BPM follows the target BPM for the runner.

### How we track heart rate

The rn-apple-healthkit module for react-native lets us access HealthKit data from the end user's Apple Watch, which is updated live  during a workout session with heart rate data. We query the Health app on the user's iPhone to obtain a fresh heart rate figure every five seconds.

### How we play songs from Spotify

This app uses the react-native-spotify library from GitHub to access Spotify's Player API and play back music based on specified URIs.


## Challenges

Picking the right API and hardware was tricky. Originally, the team wanted to use the MLH-provided Fitbit Ionic and its API. However, we opted to use an Apple Watch due to the ability to poll health data in near real-time from HealthKit on our iOS app.

Furthermore, since we developed our app in React Native, we needed a module that would handle authentication and hooking into Spotify's API. This ended up being one of the larger challenges since none of us had experience with OAuth and modules we found on Github used older versions of the Spotify SDK. We switched to an older module with somewhat reduced functionality from the full range of commands documented on Spotify's developer website, because we were able to get it working reliably in our build.

## Future Work

In the future, we'd like to implement:

* More fully-featured Spotify module with refresh token implementation and Get Audio Features, which would improve automated track sorting based on BPM.
* Classification modules for identifying which tracks from the user's library are most effective at keeping pace with the exercise
* Machine learning module for adapting exercises across sessions of the app, as their body responds differently to running
* Fleshed-out data visualization tools for user activity, including pedometer and distance traveled
