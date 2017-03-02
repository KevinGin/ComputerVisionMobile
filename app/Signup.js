import React, { Component } from 'react';
import {
	View, 
	Text,
	TextInput,
	StyleSheet,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import PageTwo from './PageTwo';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit() {
    console.log('SUBMIT HANDLER CALLED!')
  }

  registerUser() {
    console.log('registerUser called')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}/>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onTextChange={(text) => this.setState({username})}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onTextChange={(text) => this.setState({password})}
        />
        <Button
          style={styles.space}
          onPress={this.handleSubmit}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
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



