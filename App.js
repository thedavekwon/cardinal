import React from 'react'

import {createStackNavigator, createAppContainer} from "react-navigation";
import ResultScreen from "./Result"
import DetailScreen from "./Detail"
import HomeScreen from "./Home"

const AppNavigator = createStackNavigator({
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailScreen,
        },
        Result: {
            screen: ResultScreen,
        },   
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer style={{cardStyle: {
    backgroundColor: 'transparent',
}}}/>;
    }
}