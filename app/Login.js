import React, { Component } from 'react';
import {
	View, 
	Text,
	TextInput,
	StyleSheet,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const axios = require('axios')

// import PageTwo from './PageTwo';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      TeacherID: 1   //DevNote: TeacherID to be taken out after controller/db change.
    };
  }

  handleSubmit() {
    console.log('handleSubmit')
    var context = this;
    this.loginUser(context.navigateToCamera); // good candidate to Promisify
  }

  loginUser(callback) {
    console.log('registerUser called')
    var userData = this.state;
    var url = 'http://10.7.24.223:8080/auth/student/login'

    axios.post(url, userData)
    .then(function (response) {
      console.log('successful LOGIN');
      callback(response);
    })
    .catch(function (error) {
      // DEV: RENDER ERROR MESSAGE TO USER
      console.log(error);
      console.log('error caught from post');
    });
  }

  navigateToCamera(response) {
    // console.log('navigateToCamera called')
    // console.log(response.data);
    var user = response.data;
    Actions.CameraView({user: user});
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => this.setState({username: text})}
          accessibilityLabel="Input Username"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.text}
          accessibilityLabel="Input Password"
        />
        <Button
          style={styles.space}
          onPress={this.handleSubmit.bind(this)}
          title="Login"
          color="#841584"
          accessibilityLabel="Submit Username and Password"
        />
        <View style={styles.submitButton}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
  },
  space: {
    flex: 1
  },
  submitButton: {
    flex: 1
  }
});