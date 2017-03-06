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

// import PageTwo from './PageTwo';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit() {
    console.log('handleSubmit')
    var context = this;
    console.log(context.props.firstName);
    this.registerUser(); // good candidate to Promisify
  }

  registerUser() {
    var context = this;
    var userData = {
      username: context.state.username,
      password: context.state.password,
      firstName: context.props.firstName,
      lastName: context.props.lastName
    }
    var url = 'http://10.7.24.223:8080/auth/student/signup'

    axios.post(url, userData)
    .then(function(response) {
       var token = response.data.token
       AsyncStorage.setItem('@teachersPetToken', token, (err, data) => {
        if (err) {
          // DEV: Handle error storing token
          console.log(err)
        } else {
          console.log('store token success ======================>')
          console.log(userData)
          // Navigate to Precamera
          Actions.PreCamera(response.data)
          // context.navigateToPrecamera(data)
        }
      })
    })
    .catch(function(error) {
      // DEV: RENDER ERROR MESSAGE TO USER
      console.log(error);
      console.log('error caught from post ------------');
    });
  }

  // navigateToPreCamera(response) {
  //   // var user = response.data;
  //   // var context = this;
  //   // console.log('navigateToPreCamera called ------------------------')
  //   // console.log(context.props);
  //   // // user.firstName = this.props.firstName;
  //   // // user.lastName = this.props.lastName;
  //   Actions.PreCamera(user);
  // }

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
          accessibilityLabel="Create Account">
          <Text style={styles.loginText}>Create Account</Text>
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



