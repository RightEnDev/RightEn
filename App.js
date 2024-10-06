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



// import { Button, StyleSheet, Text, View, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import axios from 'axios'

// import PhonePePaymentSDK from 'react-native-phonepe-pg'
// import Base64 from 'react-native-base64'
// import sha256 from 'sha256'
// const App = () => {
//   const [mobileNumber, setMobileNumber] = useState('8436201492');
//   const [error, setError] = useState('');

//   const handleSubmit = () => {
//     // Validate: Check if the number is 10 digits
//     if (/^\d{10}$/.test(mobileNumber)) {
//       setError('');
//       alert('Mobile number is valid!'); // Replace with your logic
//     } else {
//       setError('Invalid mobile number. Must be 10 digits.');
//     }
//   };


//   const startTransac = () => {
//     console.log("-------------------------------------------------------------------------------------------------------------------------------------");
//     const environmentForSDK = 'PRODUCTION'; // SANDBOX PRODUCTION
//     const merchantId = 'M22BD1522HQFO'; // PGTESTPAYUAT M22BD1522HQFO
//     const salt_key = '7a9c42b8-a73c-45f6-8d4f-13728d0e1966';
//     //  7a9c42b8-a73c-45f6-8d4f-13728d0e1966
//     const appId = null;
//     const enableLogging = true;
//     PhonePePaymentSDK.init(
//       environmentForSDK,
//       merchantId,
//       appId,
//       enableLogging
//     ).then(result => {
//       console.log(`phone pe sdk init success   for   ${environmentForSDK} ${merchantId} ${salt_key}`);
//       const merchantTransactionId = "R" + Date.now().toString() + Math.floor(Math.random() * 10000).toString();
//       console.log('merchantTransactionId : ', merchantTransactionId);
//       const requestBody = {
//         "merchantId": merchantId,
//         "merchantTransactionId": merchantTransactionId,
//         "merchantUserId": 'R0007',
//         "amount": 100,
//         "redirectMode": "POST",
//         "paymentInstrument": {
//           "type": "PAY_PAGE"
//         }
//       }
//       const payload = Base64.encode(JSON.stringify(requestBody));
//       console.log('payload   ', typeof (payload), "  ", payload);
//       const encodechecksusm = sha256(Base64.encode(JSON.stringify(requestBody)) + '/pg/v1/pay' + salt_key) + "###" + 1

//       console.log("encodechecksusm     ", typeof (encodechecksusm), "  ", encodechecksusm);

//       PhonePePaymentSDK.startTransaction(
//         payload,
//         encodechecksusm,
//         null, null).then(async (a) => {
//           const response = await axios.get('https://iamankanghosh.github.io/VerifyMyJson/checkJson.json', {
//             headers: {
//               'Cache-Control': 'no-cache',
//               'Pragma': 'no-cache',
//               'Expires': '0',
//             },
//           });
//           console.log(response.data.builddAPP);
//           console.log(a)
//         })

//     }).catch(e => {
//       console.log(e);
//     })
//   }

//   return (
//     <View>
//       <Text style={{ marginTop: 50 }}>Payment Page</Text>
//       <TextInput
//         style={{ borderWidth: 1, margin: 5 }}
//         placeholder="Enter Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//       />
//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       <Button
//         onPress={startTransac}
//         title="Transaction"
//         color="blue"
//         accessibilityLabel="Learn more about this purple button"
//       />
//     </View>
//   )
// }

// export default App
