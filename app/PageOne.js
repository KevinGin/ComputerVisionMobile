import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import PageTwo from './PageTwo';


export default class PageOne extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text onPress={Actions.CameraView}>This is PageOne!!</Text>
      </View>
    )
  }
}