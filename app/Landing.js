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
// import PageTwo from './PageTwo';


export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.space}></View>
      	<Image source={{uri: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'}}
               style={styles.photo} />
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