# Cardinal

## Intro

This project was created by Cooper Union students Do Hyung Kwon, Minyoung Na, Elvin Hu, and Evan Bubniak as part of the hackNYU 2019 hackathon, between February 15 and February 17.

Cardinal asks questions about your running background and goals, hooks into your Spotify library, and generates workout playlists based on your running goals.
__

## Purpose

Running is an important part of cardiovascular health. Users often take up running with goals in mind: for instance, increasing their endurance, lowering their resting heart rate, or burning calories.

Research has shown that 75% of people aren't sure whether they're running too much or too little to reach their goals. Furthermore, users tend to respond to fast-paced music by speeding up, and slower-paced music by slowing down. Currently available exercise apps on the market take advantage of this by offering DJ-curated playlists to help users meet their running goals.

But users don't want to listen to DJ-curated playlists, especially people whose tastes fall outside of the US top-40 hits. User research we conducted during the hackathon demonstrates that people want to listen to their own music when they're running.

Our team identified an unmet need for a fitness app that hooked into the user's already-existing Spotify My Music Library, 

## Functionality

When the user starts an exercise session on the app, it will display a live graph of their heart rate, start an exercise stopwatch, and begin playback of a playlist tailored to the chosen workout. The tracks are picked based on their length and BPM.
__

## Dependencies

This project uses react-native, react-native-elements, react-native-svg, react-native-spotify,  react-navigation, rn-apple-healthkit, d3-shape, and expo.

Use of the app requires a Spotify account and Apple Watch.

__

## Challenges

Picking the right API and hardware was tricky. Originally, the team wanted to use the MLH-provided Fitbit Ionic and its API. However, we opted to use an Apple Watch due to the ability to poll health data in near real-time from HealthKit on our iOS app.

Furthermore, since we developed our app in React Native, we needed a module that would handle authentication and hooking into Spotify's API. This ended up being one of the larger challenges since none of us had experience with OAuth and modules we found on Github used older versions of the Spotify SDK. We switched to an older module with somewhat reduced functionality from the full range of commands documented on Spotify's developer website, because we were able to get it working reliably in our build.

## Future Work

In the future, we'd like to implement:

* More fully-featured Spotify module with refresh token implementation
* Classification modules for identifying which tracks from the user's library are most effective at keeping pace with the exercise
* Machine learning module for adapting exercises across sessions of the app, as their body responds differently to running
* Fleshed-out data visualization tools for user activity, including pedometer and distance traveled