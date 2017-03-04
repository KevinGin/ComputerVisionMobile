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
      testID: ''
    };
  }

  handleSubmit(){
    var user = this.props.user;
    var testID = this.state.testID;
    var data = {user: user, testID: testID};
    Actions.CameraView(data: data);
  }

  navigateToCamera(response) {
    var user = this.props.user;
    Actions.CameraView({user: user});
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <TextInput
          style={[styles.inputTestID]}
          placeholder="Enter Test ID"
          keyboardType='numeric'
          underlineColorAndroid='transparent'
          maxLength={16}
          onChangeText={(text) => this.setState({testID: text})}
          value={this.state.text}
          accessibilityLabel="Input Test ID"
        />
        <View style={styles.mediumLine}/>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleSubmit.bind(this)}
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