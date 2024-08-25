import { StyleSheet, Text, ScrollView, View, BackHandler, Alert, StatusBar, ActivityIndicator, FlatList, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigationState } from '@react-navigation/native';
const { width } = Dimensions.get('window');
// import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const PriceChart = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('main'); // Navigate back to the main screen
        return true; // Prevent the default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://righten.in/api/users/price_chart');
        console.log(response.data.status);
        if (!response.data.status === "success") {
          throw new Error('Network response was not ok');
        }
        // console.log(response.data.data);
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
      <View style={styles.container}
      >
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (

    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginLeft: 10,
        width: 600
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 16,
          width: 150,
          textAlign: 'left',
          paddingHorizontal: 5,
        }}
      >
        {item.service_name}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 16,
          width: 150,
          textAlign: 'left',
          paddingHorizontal: 5,
        }}
      >
        {item.sub_service}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 16,
          width: 100,
          textAlign: 'left',
          paddingHorizontal: 5,
        }}
      >
        ₹{item.offer_price}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 16,
          width: 100,
          textAlign: 'left',
          paddingHorizontal: 5,
        }}
      >
       ₹ {item.charges}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 16,
          width: 100,
          textAlign: 'left',
          paddingHorizontal: 5,
        }}
      >
        ₹{item.income}
      </Text>
      
    </View>
  );


  // const headerItem = ()=>(
  //   <View
  //     style={{
  //       flexDirection: 'row',
  //       alignItems: 'center',
  //       paddingVertical: 10,
  //       borderBottomWidth: 1,
  //       borderBottomColor: '#ccc',
  //       marginLeft:10,
  //       width:700
  //     }}
  //   >
  //     <Text
  //       style={{
  //         fontWeight: 'bold',
  //         color: 'black',
  //         fontSize: 16,
  //         width: 150,
  //         textAlign: 'left',
  //         paddingHorizontal: 5,
  //       }}
  //     >
  //       Name
  //     </Text>
  //     <Text
  //       style={{
  //         fontWeight: 'bold',
  //         color: 'black',
  //         fontSize: 16,
  //         width: 150,
  //         textAlign: 'left',
  //         paddingHorizontal: 5,
  //       }}
  //     >
  //       serice
  //     </Text>
  //     <Text
  //       style={{
  //         fontWeight: 'bold',
  //         color: 'black',
  //         fontSize: 16,
  //         width: 100,
  //         textAlign: 'center',
  //         paddingHorizontal: 5,
  //       }}
  //     >
  //       price
  //     </Text>
  //     <Text
  //       style={{
  //         fontWeight: 'bold',
  //         color: 'black',
  //         fontSize: 16,
  //         width: 100,
  //         textAlign: 'center',
  //         paddingHorizontal: 5,
  //       }}
  //     >
  //      Earnings
  //     </Text>
  //     <Text
  //       style={{
  //         fontWeight: 'bold',
  //         color: 'black',
  //         fontSize: 16,
  //         width: 100,
  //         textAlign: 'center',
  //         paddingHorizontal: 5,
  //       }}
  //     >
  //       Earnings
  //     </Text>
  //   </View>
  // )

  return (
    <View style={{
      backgroundColor: '#fff',
      flex: 1,
    }}>
      <StatusBar
        // barStyle="light-content" // Light text for dark backgrounds
        backgroundColor="#06b4d6"
      />
      <Text style={{alignSelf:'center',justifyContent:'center',fontSize:20,fontWeight:'bold',color:'#009743',marginTop:5}}> ₹ Price Chart All Services
</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>

        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              marginLeft: 10,
              width: 600,
              backgroundColor:'#d2d2d2'
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
                width: 150,
                textAlign: 'left',
                paddingHorizontal: 5,
              }}
            >
              Name
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
                width: 150,
                textAlign: 'left',
                paddingHorizontal: 5,
              }}
            >
              serice
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
                width: 100,
                textAlign: 'left',
                paddingHorizontal: 5,
              }}
            >
              offer price
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
                width: 100,
                textAlign: 'left',
                paddingHorizontal: 5,
              }}
            >
              price
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
                width: 100,
                textAlign: 'left',
                paddingHorizontal: 5,
              }}
            >
              Earnings
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}

          // scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PriceChart

const styles = StyleSheet.create({})