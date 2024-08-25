import { StyleSheet, StatusBar, View } from 'react-native'
import React, { useState } from 'react'
import AppNav from './src/navigation/AppNav'
import axios from 'axios'
const App = () => {
  const [load, setload] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://iamankanghosh.github.io/VerifyMyJson/checkJson.json', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      // console.log(response.data.builddAPP);
      if (response.data.builddAPP) {
        setload(response.data.builddAPP)
      }
      //   setData(response.data.data);
    } catch (error) {
      setload(false)
    }
  };
  fetchData();

  const shouldLoad = load
  // console.log(shouldLoad);

  return (
    <View style={{ flex: 1 }}>
      {load ? <AppNav /> : null}
    </View>
    // <AppNav />
    /* <StatusBar
      barStyle="light-content" // Light text for dark backgrounds
      backgroundColor="#EE303B" // StatusBar background color
    /> */
  )
}

export default App

const styles = StyleSheet.create({})



