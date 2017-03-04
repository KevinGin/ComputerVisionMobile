import React, { Component } from 'react';
import { 
	View,
	Text,
  Image,
	StyleSheet,
  TouchableOpacity,
  Dimensions
 } from 'react-native';
 import { Actions } from 'react-native-router-flux';
 const { width, height } = Dimensions.get('window')



export default class FailedToPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space} />
        <Text style={styles.textMajor}>
              Failed To Upload</Text>
        <Text style={styles.textMinor}>placeholder message from server</Text>
        
        <Image source={require('./assets/pencil-horizontal.png')}
               style={styles.pencil}
               />
        <View style={styles.space} />
        <Text style={styles.buttonText}
              onPress={Actions.CameraView}>Try Again</Text>
        <View style={styles.space} />
      </View>
    )
  }
}





// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'
// '#C9D492'

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  space: {
    flex: 1,
  },
  indicator: {
    flex: 2,
  },
  pencil: {
    left: (width / 2) - 75
  },
  textMajor: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 45,
    textAlign: 'center'
  },
  textMinor: {
    color: '#85AF4B',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  textPercentage: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 45,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection:'row',

  },
  button: {
    flex: 1,
    backgroundColor: 'red',
    textAlign: 'center'
  },

  buttonText: {
    height: 100,
    color: '#666666',
    backgroundColor: '#85AF4B',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 30,
    width: 200,
    left: (width / 2) - 100,
    borderRadius: 4,
  

  },
})