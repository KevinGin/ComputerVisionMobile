/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ComputerVisionMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.option}>
          Create New Key
        </Text>
        <Text style={styles.option}>
          Upload Student Tests
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  option: {
    fontSize: 40,
    flex: 1,
    backgroundColor: 'steelblue',
    textAlign: 'center',
    margin: 10
  },
});

AppRegistry.registerComponent('ComputerVisionMobile', () => ComputerVisionMobile);
