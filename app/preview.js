import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from './spinner.js';
import { Actions } from 'react-native-router-flux';
import SuccessfulPost from './SuccessfulPost.js'
const axios = require('axios');
var CryptoJS = require('crypto-js');
var Cloudinary = require('../config/cloudinary.js')
const { width, height } = Dimensions.get('window')

export default class Preview extends Component {
  constructor(props) {
    super(props);
  }

  discardImage() {
    Actions.pop();
  }

  useImage() {
    var context = this;
    var cloudinaryResponse = JSON.parse(context.props.cloudinaryResponse);
    var cloudURL = cloudinaryResponse.url;
    this.postToServer(cloudURL);
  }


  postToServer(cloudURL) {
    var context = this;
    console.log('posting to server ------------------------')
    // Fetch Web Token Asyc
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {

      // let hardCodedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'
      let hardCodedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488672122/rzcckliek05taq6a2pul.jpg'

      // DEV: When server changes are made, should also pass up USER ID, not USERNAME. Hard Coded UserID for now.
      console.log('about to upload data ------------------------------------------------------------------------------------------')
      var username = this.props.username;
      var answerKeyID = this.props.answerKeyID;


      var data = {
        url: hardCodedURL,   // hard-coded for DEV
        // url: cloudURL,
        AnswerKeyID: answerKeyID,
        StudentID: 1,
 
        token: token
      }

      var config = {
        method: 'post',
        data: data,
        url: 'http://10.7.24.223:8080/api/addTest'
      }

      axios(config)
        .then((response) => {
          console.log('posted successfully --------------------⁄')
          var data = response.data;
          Actions.SuccessfulPost(data);

        })
        .catch((err) => {
          console.log('catch called -------------------------')
          Actions.FailedToPost(data);
        })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}></View>
        <Image source={{uri: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'}}
               style={styles.image} />
        <View style={styles.buttonContainer}>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.discardImage.bind(this)}>
            <Text style={styles.goBackText}> {'\<-- Discard'}</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.useImage.bind(this)}>
            <Text style={styles.submitText}>Submit Test</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
        </View>
        <View style={styles.space}></View>
      </View>
    )
  }
}


// Possible Arrow Images (each listed for commercial use)
// https://pixabay.com/p-1646213/?no_redirect
// http://downloadicons.net/sites/default/files/returns--button-icon-68858.png


// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'
// '#C9D492'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3E2BD',
    alignItems: 'center',
  },
  space: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 400
  },
  button: {
    flex: 4.5,
    // backgroundColor: 'blue'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
  },
  goBackText: {
    flex: 1,
    color: '#666666',
    backgroundColor: 'lightgray',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 12,
    borderRadius: 4,
  },
  submitText: {
    flex: 1,
    color: 'lightgray',
    backgroundColor: '#85AF4B',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 12,
    borderRadius: 4,
  },
});