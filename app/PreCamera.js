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


export default class PreCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerKeyID: ''
    };
  }

  navigateToCamera(response) {
    var user = this.props.user;
    console.log('user =>', user)
    var answerKeyID = this.state.answerKeyID;
    var data = {
      user: user,
      answerKeyID: answerKeyID
    }
    console.log(data)
    Actions.CameraView(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <Text style={styles.studentID}>Welcome! Your User ID is: {(this.props.user.id).toString(4)}</Text>
        <TextInput
          style={[styles.inputTestID]}
          placeholder="Enter Test ID"
          keyboardType='numeric'
          underlineColorAndroid='transparent'
          maxLength={16}
          onChangeText={(text) => this.setState({answerKeyID: text})}
          value={this.state.text}
          accessibilityLabel="Input Test ID"
        />
        <View style={styles.mediumLine}/>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.navigateToCamera.bind(this)}
          accessibilityLabel="Enter Test ID">
          <Text style={styles.loginText}>Photograph Test</Text>
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
  inputTestID: {
    flex: 1,
    left: width / 10,
    width: width * .8,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 15,
    borderRadius: 4
  },
  studentID: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  space: {
    flex: 3
  },
  mediumLine: {
    height: 5
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
    paddingTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
});

// <Text style={styles.studentID}>Welcome! Your userID is: {this.props.user.userID}</Text>

