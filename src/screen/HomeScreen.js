// import { StyleSheet, Text, View, Button } from 'react-native';
// import React from 'react';

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       {/* <Button
//         title="Go to drawer"
//         onPress={() => navigation.toogleDrawer()}
//       /> */}
//       <Text style={styles.title}>HomeScreen</Text>
//       <Button
//         title="Go to Example 1"
//         onPress={() => navigation.navigate('Example1')}
//       />
//       <Button
//         title="Go to Example 2"
//         onPress={() => navigation.navigate('Example2')}
//       />
//       <Button
//         title="Go to Example 3"
//         onPress={() => navigation.navigate('Example3')}
//       />
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details', { itemId: 424 })}
//       />
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details', { itemId: 43 })}
//       />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red'
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });





import { StyleSheet, Text, View, StatusBar, ActivityIndicator, FlatList, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://righten.in/api/users/services');
        console.log(response.data.status);
        if (!response.data.status === "success") {
          throw new Error('Network response was not ok');
        }
        setData(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => {
    return (
      item.status === "1" && item.app_icon != null ? (
        <View style={styles.service_box}>
          <Image
            source={{ uri: `https://righten.in/public/app/assets/img/service_icon/${item.app_icon}` }}
            style={styles.service_image}
          />
          {/* <Text>{item.service_name}</Text> */}
        </View>
      ) : null
    )
  };

  return (
    <View style={styles.service_image_container}>
      <StatusBar
        // barStyle="light-content" // Light text for dark backgrounds
        backgroundColor="#CFF7FF"
      />

      <View style={{marginTop:30}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.service_row}
        />

      </View>


    </View>

  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  service_image_container: {
    backgroundColor: '#fff',
    flex: 1,
    // marginLeft: 14,
    // marginRight: 14,
    // marginTop: 30,

  },
  service_row: {
    width: "100%",
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,

  },
  service_box: {
    justifyContent: 'center',
    width: (width - 0) / 3 - 28,
    height: (width - 0) / 3 - 28,
    margin: 5,
    borderWidth: 2,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    borderColor: '#FFCB0A'
  },
  service_image: {
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

