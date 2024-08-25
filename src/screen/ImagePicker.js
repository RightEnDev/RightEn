
// import React, { useState } from 'react';
// import {
//   Button,
//   PermissionsAndroid,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Alert,
//   Platform,
//   ActionSheetIOS,
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



// const App = () => {
//   const [photoUri, setPhotoUri] = useState(null);
//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Cool Photo App Camera Permission',
//           message:
//             'Cool Photo App needs access to your camera ' +
//             'so you can take awesome pictures.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };
  
//   const handleChooseImage = async (option) => {
//     if (option === 'camera') {
//       const hasPermission = await requestCameraPermission();
//       if (hasPermission) {
//         launchCamera({ mediaType: 'photo', includeBase64: false }, (response) => {
//           if (response.didCancel) {
//             Alert.alert('User cancelled photo picker');
//           } else if (response.errorCode) {
//             Alert.alert('ImagePicker Error: ', response.errorMessage);
//           } else {
//             setPhotoUri(response.assets[0].uri);
//           }
//         });
//       } else {
//         Alert.alert('Camera permission denied');
//       }
//     } else if (option === 'gallery') {
//       launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
//         if (response.didCancel) {
//           Alert.alert('User cancelled photo picker');
//         } else if (response.errorCode) {
//           Alert.alert('ImagePicker Error: ', response.errorMessage);
//         } else {
//           setPhotoUri(response.assets[0].uri);
//         }
//       });
//     }
//   };
  
//   const showOptions = () => {
//     const options = ['Take Photo', 'Choose from Gallery', 'Cancel'];
//     const cancelButtonIndex = 2;
  
//     if (Platform.OS === 'ios') {
//       ActionSheetIOS.showActionSheetWithOptions(
//         {
//           options,
//           cancelButtonIndex,
//         },
//         (buttonIndex) => {
//           if (buttonIndex === 0) {
//             handleChooseImage('camera');
//           } else if (buttonIndex === 1) {
//             handleChooseImage('gallery');
//           }
//         }
//       );
//     } else {
//       Alert.alert(
//         'Select Option',
//         'Choose an action',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Take Photo',
//             onPress: () => handleChooseImage('camera'),
//           },
//           {
//             text: 'Choose from Gallery',
//             onPress: () => handleChooseImage('gallery'),
//           },
//         ],
//         { cancelable: true }
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.item}>Try permissions</Text>
//       <Button title="Choose an Option" onPress={showOptions} />
//       {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: StatusBar.currentHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   item: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//     alignSelf: 'center',
//   },
// });

// export default App;



// import React, { useState } from 'react';
// import {
//   Button,
//   PermissionsAndroid,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Alert,
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const App = () => {
//   const [photoUri, setPhotoUri] = useState(null);

//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Cool Photo App Camera Permission',
//           message:
//             'Cool Photo App needs access to your camera ' +
//             'so you can take awesome pictures.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const handleChooseImage = async (option) => {
//     if (option === 'camera') {
//       const hasPermission = await requestCameraPermission();
//       if (hasPermission) {
//         launchCamera({ mediaType: 'photo', includeBase64: false }, (response) => {
//           if (response.didCancel) {
//             Alert.alert('User cancelled photo picker');
//           } else if (response.errorCode) {
//             Alert.alert('ImagePicker Error: ', response.errorMessage);
//           } else {
//             setPhotoUri(response.assets[0].uri);
//           }
//         });
//       } else {
//         Alert.alert('Camera permission denied');
//       }
//     } else if (option === 'gallery') {
//       launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
//         if (response.didCancel) {
//           Alert.alert('User cancelled photo picker');
//         } else if (response.errorCode) {
//           Alert.alert('ImagePicker Error: ', response.errorMessage);
//         } else {
//           setPhotoUri(response.assets[0].uri);
//         }
//       });
//     }
//   };

//   const showOptions = () => {
//     Alert.alert(
//       'Select Option',
//       'Choose an action',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Take Photo',
//           onPress: () => handleChooseImage('camera'),
//         },
//         {
//           text: 'Choose from Gallery',
//           onPress: () => handleChooseImage('gallery'),
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.item}>Try permissions</Text>
//       <Button title="Choose an Option" onPress={showOptions} />
//       {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: StatusBar.currentHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   item: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//     alignSelf: 'center',
//   },
// });

// export default App;





import React, { useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [photoUris, setPhotoUris] = useState([]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleChooseImage = async (option) => {
    if (option === 'camera') {
      const hasPermission = await requestCameraPermission();
      if (hasPermission) {
        launchCamera({ mediaType: 'photo', includeBase64: false }, (response) => {
          if (response.didCancel) {
            Alert.alert('User cancelled photo picker');
          } else if (response.errorCode) {
            Alert.alert('ImagePicker Error: ', response.errorMessage);
          } else {
            setPhotoUris((prevUris) => [...prevUris, response.assets[0].uri]);
          }
        });
      } else {
        Alert.alert('Camera permission denied');
      }
    } else if (option === 'gallery') {
      launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
        if (response.didCancel) {
          Alert.alert('User cancelled photo picker');
        } else if (response.errorCode) {
          Alert.alert('ImagePicker Error: ', response.errorMessage);
        } else {
          setPhotoUris((prevUris) => [...prevUris, response.assets[0].uri]);
        }
      });
    }
  };

  const showOptions = () => {
    Alert.alert(
      'Select Option',
      'Choose an action',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Take Photo',
          onPress: () => handleChooseImage('camera'),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => handleChooseImage('gallery'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.item}>Try permissions</Text>
      <Button title="Choose an Option" onPress={showOptions} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {photoUris.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default App;
