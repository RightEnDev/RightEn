import { StyleSheet, StatusBar, Text, Image, View, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import AppNav from './src/navigation/AppNav'
import axios from 'axios'
const LOGO = require('./assets/images/logo.png');
const { width, height } = Dimensions.get('window');

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
      {load ?
        <AppNav />
        :
        <>
          <View style={styles.container}>
            <Image
              source={LOGO} // Replace with your image URL
              style={[styles.image, { width: width * 0.8, height: height * 0.4 }]} // Adjust size as needed
              resizeMode="contain" // You can use other modes like 'cover', 'stretch', etc.
            />
          </View>
        </>
      }
      {/* {load ? <AppNav /> : null} */}

    </View>
    // <AppNav />

  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFF7FF'
  },
  image: {
    // width and height are controlled in the Image component inline style
  },
});

