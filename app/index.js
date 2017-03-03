import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Landing from './Landing';
import PageTwo from './PageTwo';
import CameraView from './camera';
import Signup from './Signup'

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="CameraView" component={CameraView} title="Camera"  />
          <Scene key="Landing" component={Landing} title="Teacher's Pet: Student" initial={true}/>
          <Scene key="Signup" component={Signup} title="Signup" />
        </Scene>
      </Router>
    )
  }
}