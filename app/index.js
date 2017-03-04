import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Landing from './Landing';
import PageTwo from './PageTwo';
import CameraView from './camera';
import Signup from './Signup';
import Login from './Login';
import PreCamera from './PreCamera';
import SuccessfulPost from './SuccessfulPost';
import FailedToPost from './FailedToPost';

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Landing" component={Landing} title="Teacher's Pet: Student" hideNavBar initial={true} />
          <Scene key="CameraView" component={CameraView} title="Camera" hideNavBar />
          <Scene key="Signup" component={Signup} title="Signup" />
          <Scene key="Login" component={Login} title="Login" />
          <Scene key="PreCamera" component={PreCamera} title="PreCamera" />
          <Scene key="SuccessfulPost" component={SuccessfulPost} title="SuccessfulPost" hideNavBar/>
          <Scene key="FailedToPost" component={FailedToPost} title="FailedToPost" hideNavBar/>
        </Scene>
      </Router>
    )
  }
}