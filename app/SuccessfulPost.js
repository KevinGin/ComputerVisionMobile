import React, { Component } from 'react';
import { 
	View,
	Text,
  Image,
	StyleSheet,
  Dimensions
 } from 'react-native';
 const { width, height } = Dimensions.get('window')



export default class SuccessfulPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bonus: 0
    };
  }

  easterEgg() {
    var context = this;
    this.setState({
      bonus: context.state.bonus + 1
    })
  }

  removeEasterEgg() {
    console.log('removeEasterEgg')
    this.setState({
      bonus: 0
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space} />
        <Text style={styles.textMajor}
              onPress={this.removeEasterEgg.bind(this)}>
              Upload Successful!</Text>
        <Text style={styles.textMinor}>You received a score of: </Text>
        <Text style={styles.textPercentage}
              onPress={this.easterEgg.bind(this)}>{(this.props.result * 100) + this.state.bonus}%</Text>
        <Image source={require('./assets/pencil-horizontal.png')}
               style={styles.pencil}
               />
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
    backgroundColor: '#D3E2BD',
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
    color: '#85AF4B',
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
  }
})