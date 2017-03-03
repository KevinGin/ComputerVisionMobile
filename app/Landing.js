import React, { Component } from 'react';
import {
	View, 
	Text,
	Image,
  TouchableOpacity,
	StyleSheet,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from './Swiper';



export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.space}></View>
        <Swiper style={styles.swiper}></Swiper>
        <View style={styles.buttonContainer}>
        	<TouchableOpacity
        	  style={styles.button}
            onPress= {Actions.Login}>
            <Text style={styles.buttonText}> Login</Text>
          </TouchableOpacity>
        	<TouchableOpacity
            style={styles.button}
            onPress= {Actions.Signup}>
            <Text style={styles.buttonText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    height: 10
  },
  space: {
  	flex: 1,
  },
  photo: {
  	flex: 9,
  },
  buttonContainer: {
  	flex: 1,
    flexDirection:'row',
  },

  button: {
    flex: 1,
    color: 'red',
  },

  buttonText: {
    flex: 1,
    color: 'black',
    backgroundColor: 'lightgray'
  },
});