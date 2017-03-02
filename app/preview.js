import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Picker,
  Image
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from './spinner.js'
const axios = require('axios');
var CryptoJS = require('crypto-js');
var Cloudinary = require('../config/cloudinary.js')

export default class Preview extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   postMode: 'TeacherKey',    // key or test
    //   teacherID: 1,       // hard-coded for now
    //   courseID: 1,         // hard-coded for now
    //   spinner: false
    // };
  }

  useImage() {
    console.log('useImage clicked')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2}}></View>
        <Image source={{uri: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'}}
               style={{width: 300, height: 400}} />
        <Text style={{flex: 3}}>PREVIEW PAGE ABC!!</Text>
      </View>
    )
  }
}