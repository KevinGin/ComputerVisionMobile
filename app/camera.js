import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Picker,
  AsyncStorage
} from 'react-native';
import Camera from 'react-native-camera';
import Spinner from './spinner.js'
const axios = require('axios');
var CryptoJS = require('crypto-js');
var Cloudinary = require('../config/cloudinary.js')

const Item = Picker.item;

export default class CameraView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postMode: 'TeacherKey',    // key or test
      teacherID: 1,       // hard-coded for now
      courseID: 1,         // hard-coded for now
      spinner: false
    };
  }

  takePicture() {
    var context = this;
    this.camera.capture()
      .then((data) => {
        console.log('picture taken')
        context.setState({
          spinner: true
        })
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
    // Fetch Web Token Asyc
    AsyncStorage.getItem('@teachersPetToken', (err, token) => {
      console.log('fetched ====> ')
      console.log(token)

      var responseString = cloudinaryData.target._response;
      var responseObject = JSON.parse(responseString);
      var imageURL = responseObject.url

      // DEV: hard-coded for DEV.
      let hardCodedURL = 'http://res.cloudinary.com/dn4vqx2gu/image/upload/v1487892182/p6ybu5bjev1nnfkpebcc.jpg'


      var data = {
        // DEV: uncomment to hard-code URL
        url: hardCodedURL,
        // url: imageURL,
        TeachersID: context.state.teacherID,
        ClassesID: this.state.courseID,
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
          console.log(response)
          // DEV: DISPLAY SCORE
          context.setState({
            spinner: false
          })
        })
        .catch((err) => {
          console.log('catch called -------------------------')
          console.log(err)
          // DEV: DISPLAY ERROR MESSAGE
          context.setState({
            spinner: false
          })
        })






    });
  }

  handlePickerChange(value) {
    console.log('pickerchanged')
    this.setState({
      postMode: value
    })
  }


  fetch() {
    console.log('fetch called')
    AsyncStorage.getItem('@teachersPetToken', (err, data) => console.log(data));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.spinner ? 
          <Spinner></Spinner> : 
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
          <View style={styles.topBar}>
            <Text> {this.props.username} </Text>
          </View>
          
          <View style={styles.outline}></View>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>   [Upload]   </Text>
        </Camera>
        }
      </View>
    );
  }
}

// Color Scheme:
// '#85AF4B'
// '#ADC986'
// '#D3E2BD'



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,

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
    backgroundColor: '#85AF4B',
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    margin: 40
  },
  outline: {
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#ADC986',
    borderRadius: 10,
    borderWidth: 3,
    width: 280,
    flex: 5
  },
  topBar: {
    flex: 1,
  }
});