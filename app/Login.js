import React, { Component } from 'react';
import {
	View, 
	Text,
	TextInput,
	StyleSheet,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const axios = require('axios')
const { width, height } = Dimensions.get('window')

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorText: ''
    }
  }

  handleSubmit() {
    console.log('handleSubmit')
    var context = this;
    this.loginUser(context.navigateToPreCamera.bind(this)); // good candidate to Promisify
  }

  loginUser(callback) {
    var context = this;
    console.log('loginUser called')
    var userData = {
      username: this.state.username,
      password: this.state.password,
    }

    console.log(userData)
    var url = 'http://10.7.24.223:8080/auth/student/login'

    axios.post(url, userData)
    .then(function (response) {
      var token = response.data.token
      console.log(token)
      AsyncStorage.setItem('@teachersPetToken', token, (err, data) => {
        if (err) {
          context.setState({
            errorText: 'Sorry, unable to store token on your device. Please try again.'
          })
        } else {
          // navigate to PreCamera
          console.log('about to navigate to PreCamera')
          callback(response)
        }
      })
    })
    .catch(function (error) {
      console.log('CATCH CALLED ================================================')
      context.setState({
        errorText: 'Invalid username or password.',
        password: ''
      })
    });
  }

  navigateToPreCamera(response) {
    console.log('navigate to precamera')
    this.setState({
      errorText: '',
      password: ''
    })
    var user = response.data;
    Actions.PreCamera(user);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <TextInput
          style={[styles.input, styles.inputTop]}
          placeholder="Username"
          underlineColorAndroid='transparent'
          maxLength={16}
          onChangeText={(text) => this.setState({username: text})}
          accessibilityLabel="Input Username"
        />
        <View style={styles.thinLine}/>
        <TextInput
          style={[styles.input, styles.inputBottom]}
          placeholder="Password"
          underlineColorAndroid='transparent'
          maxLength={16}
          secureTextEntry
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.text}
          accessibilityLabel="Input Password"
        />
        <View style={styles.mediumLine}/>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleSubmit.bind(this)}
          accessibilityLabel="Submit Username and Password">
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{this.state.errorText}</Text>
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
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    width: width * .8,
    left: width * .1,
  }
});