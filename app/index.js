import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Picker,
} from 'react-native';
import Camera from 'react-native-camera';
const axios = require('axios');
var CryptoJS = require('crypto-js');
var Cloudinary = require('../config/cloudinary.js')

const Item = Picker.item;

export default class ComputerVisionMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postMode: 'TeacherKey',    // key or test
      teacherID: 1,       // hard-coded for now
      courseID: 1         // hard-coded for now
    };
  }


  takePicture() {
    var context = this;
    this.camera.capture()
      .then((data) => {
        console.log('picture taken')
        // DEVNOTE: commented out during dev so don't make unnecessary API requests
        context.uploadImage(data.path, context.postToServer.bind(context));
      })
      .catch(err => console.error(err));
  }

  uploadImage(uri, postToServer) {
    console.log('uploading image to Cloudinary -------------------')
    var context = this;
    // DEV NOTE: On future iterations, we can upload without an API Key (and without hashing it with our secret)
    // But in order to do that, we'll need to set up a Cloudinary PRESET for us to upload to.
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = Cloudinary['api_key']
    let api_secret = Cloudinary['api_secret']
    let cloud = Cloudinary['cloud_name']
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = (data) => {
      console.log('onload called')
      // callback is postToServer
      postToServer(data)
    };
    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/jpg', name: 'upload.jpg'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }

  postToServer(cloudinaryData) {
    var context = this;
    console.log('posting to server ------------------------')

    var responseString = cloudinaryData.target._response;
    var responseObject = JSON.parse(responseString);
    var imageURL = responseObject.url

    var data = {
      // url: 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg',
      url: imageURL,
      TeachersID: context.state.teacherID,
      ClassesID: this.state.classID
    }

    var config = {
      method: 'post',
      data: data
    }

    if (this.state.postMode === 'TeacherKey') {
      config.url = 'http://10.7.24.223:8080/teacher/addAnswerKey'
    } else {
      console.log('THIS WILL NOT POST BECAUSE URL NOT ADDED-------------------')
      config.url = 'foobarr'  // KG update after Benz pull request 
    }

    axios(config)
      .then(() => console.log('posted successfully', config.data.TeachersID))
      .catch(() => console.log('catch called'))
  }

  handlePickerChange(value) {
    console.log('pickerchanged')
    this.setState({
      postMode: value
    })
  }

  // leave in for development/debugging. Good funciton for testing Android connection to localhost over wifi.
  // serverTest() {
  //   var data = {"url":"http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg","TeachersID": 1, "ClassesID": 1}
  //   var config = {
  //     method: 'post',
  //     data: data,
  //     url: 'http://10.7.24.223:8080/teacher/addAnswerKey'
  //   }
  //   console.log('running serverTest')
  //   axios(config)
  //     .then(() => console.log('posted', config.data.TeachersID))
  //     .catch(() => console.log('catch called'))
  // }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          //aspect as fit crops viewfinder, helps ensure uploaded image has right aspect ratio
          aspect={Camera.constants.Aspect.fill}
          //iOS will always give 720x1280
          //Most Android will sive the same, but might need to edit on Cloudinary for rogue Android cameras
          captureQuality={"720p"}>
          <Picker
            style={styles.picker}
            selectedValue= {this.state.postMode}
            onValueChange= {this.handlePickerChange.bind(this)}>
            <Item label="Upload Teacher Key" value="TeacherKey" />
            <Item label="Upload Student Test" value="StudentTest" />
          </Picker>
          <View style={styles.outline}></View>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  outline: {
    justifyContent:'center',
    alignItems:'center',
    borderColor:'skyblue',
    borderRadius: 10,
    borderWidth: 3,
    width: 280,
    flex: 5
  },
  picker: {
    flex: 1,
    width: 240,
  }
});