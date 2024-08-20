import { StyleSheet, StatusBar ,View} from 'react-native'
import React from 'react'
import AppNav from './src/navigation/AppNav'

const App = () => {
  return (

      <AppNav />
      /* <StatusBar
        barStyle="light-content" // Light text for dark backgrounds
        backgroundColor="#EE303B" // StatusBar background color
      /> */
  )
}

export default App

const styles = StyleSheet.create({})