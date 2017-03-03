import React from 'react'
import {
  Text,
  View,
  Dimensions,
} from 'react-native'
import Swiper from 'react-native-swiper'

var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#85AF4B'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADC986'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3E2BD'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}





export default () => <Swiper style={styles.wrapper} height={Dimensions.get('window').height*.78} showsButtons autoplay>
  <View style={styles.slide1}>
    <Text style={styles.text}>Take Test.</Text>
  </View>
  <View style={styles.slide2}>
    <Text style={styles.text}>Take Photo.</Text>
  </View>
  <View style={styles.slide3}>
    <Text style={styles.text}>Get Results.</Text>
    <Text style={styles.text}>In Seconds.</Text>
  </View>
</Swiper>