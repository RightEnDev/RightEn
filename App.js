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



// import { Button, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import PhonePePaymentSDK from 'react-native-phonepe-pg'
// import base64 from 'react-native-base64';
// // import sha256 from 'sha256';
// import { sha256, sha256Bytes } from 'react-native-sha256';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import qs from 'qs';


// const App = () => {

//   const payinititate = async() => {
//     console.log("started");
//     PhonePePaymentSDK.init(
//       "PRODUCTION",
//       'M22BD1522HQFO',
//       null,
//       true
//     ).then(async(result) => {
//       console.log("init done");
//       const us_id = await AsyncStorage.getItem('us_id');


//     const response = await axios.post('https://righten.in/api/services/pancard/payment_pg',
//         qs.stringify({
//           txn_id:'PAN2100785215'+Math.floor(Math.random() * 9000) + 1000
//           ,
//           user_id: us_id,
//           amount: 1,
//           mobile: 8436201492
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       console.log(base64.decode(response.data.encoded));
    

//       PhonePePaymentSDK.startTransaction(response.data.encoded, response.data.final_x_header, null, null)
//         .then((a) => {
//           console.log('*****************')

//           console.log(a)
//         })
//         .catch((err) => {
//           console.log("------------------------------");

//           console.log("here");
//           console.log(err);
//         })



      

//     }).catch((err) => {
//       console.log("here--------");
//       console.log(err);
//     })
//   }
//   return (
//     <View style={{
//       justifyContent: 'center', alignItems: 'center', marginTop: '30%'

//     }}>
//       <Text>App</Text>
//       <Button title='pay' onPress={payinititate} />
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})






