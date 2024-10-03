import { StatusBar, Image, BackHandler, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, Linking, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/vertical_righten_without_logo.png'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';
import Toast from 'react-native-toast-message';
import PhonePePaymentSDK from 'react-native-phonepe-pg' 

const PaymentPage = ({ route, navigation }) => {
  const { txn_id } = route.params;
  // console.log("from payment page");
  // console.log(txn_id, "----------------------------------------------------------------------------------");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('main'); 
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("fetch data called in function");
      const response = await axios.post('https://righten.in/api/services/pancard/payment_pg_phonepe',
        qs.stringify({
          pan_txn_id: txn_id,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log("----------------********************------------");
      console.log(response.data);
      console.log(response.data.payment_status !== "success");
      // console.log( response.data.status !== "success");
      if (response.data.payment_status !== "success") {
        throw new Error('Network response was not ok');
      }
      if (response.data.payment_status === "success") {
        setData(response.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Oops! 😔',
      text2: 'Something went wrong. Please try again.',
      // position: 'top', // or 'bottom'
    });
  };


  useEffect(() => {
    fetchData(); 
  }, []);

  const handlePress = async (url) => {
    try {
      const response = await axios.post(
        'https://righten.in/api/services/pancard/payment_status_phonepe',
        qs.stringify({
          transactionId: txn_id,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log("onlick222");
      console.log(response.data.payment_status === true);
      if (response.data.payment_status === true) {
        navigation.navigate('main');
      }
      else {
        await Linking.openURL(url);
      }
    } catch (error) {
      // console.log(error);
      showErrorToast();
    }
    // const url = '';
  };
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            position: 'relative',
            zIndex: 10, // Ensure the toast is on top
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Toast />
        </View>
        <Text style={styles.username}>Pay To:  RightEN.in</Text>
        <Image
          source={logo}
          style={{
            width: 300,
            height: undefined,
            aspectRatio: 5,
          }}

        />
        <Text style={[styles.username, { marginTop: 50 }]}>Payer Name:
          {data.payer_name}
        </Text>
        <Text style={styles.amount}>Amount: ₹
          {data.pay_amount}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          // console.log("predd");
          handlePress(data.pay_url)
        }}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
