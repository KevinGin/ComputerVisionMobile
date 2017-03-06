import React, { Component } from 'react';
import {
	View, 
	Text,
	TextInput,
	StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const axios = require('axios')
const { width, height } = Dimensions.get('window')


export default class PreSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  handleSubmit() {
    var context = this;
    Actions.Signup({
      firstName: context.state.firstName,
      lastName: context.state.lastName,
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <TextInput
          style={[styles.input, styles.inputTop]}
          placeholder="First Name"
          underlineColorAndroid='transparent'
          maxLength={16}
          onChangeText={(text) => this.setState({firstName: text})}
          accessibilityLabel="Input Username"
        />
        <View style={styles.thinLine}/>
        <TextInput
          style={[styles.input, styles.inputBottom]}
          placeholder="Last Name"
          underlineColorAndroid='transparent'
          maxLength={16}
          onChangeText={(text) => this.setState({lastName: text})}
          value={this.state.text}
          accessibilityLabel="Input Password"
        />
        <View style={styles.mediumLine}/>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleSubmit.bind(this)}
          accessibilityLabel="Create Account">
          <Text style={styles.loginText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.space}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ADC986',
  },
  input: {
    flex: 1,
    left: width / 10,
    width: width * .8,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 15

  },
  inputTop: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,   
  },
  inputBottom: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  thinLine: {
    height: 1,
  },
  mediumLine: {
    height: 5
  },
  space: {
    flex: 3
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#85AF4B',
    borderRadius: 4,
    width: width * .8,
    left: width / 10
  },
  loginText: {
    fontSize: 20,
    paddingTop: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
});