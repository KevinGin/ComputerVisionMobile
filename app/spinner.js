import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class Spinner extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{flex: 1}}>UPLOADING IMAGE!!</Text>
        <Text style={{flex: 1}}>UPLOADING IMAGE!!</Text>
        <Text style={{flex: 1}}>UPLOADING IMAGE!!</Text>
      </View>
    )
  }
}