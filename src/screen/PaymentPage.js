

import { StatusBar,Image, SafeAreaView,StyleSheet, Text, TouchableOpacity,Linking, View,Alert } from 'react-native'
import React from 'react';
import logo from './assets/images/vertical_righten_without_logo.png'

const App = () => {
  const handlePress = async () => {
    const url =`upi://pay?pa=MANSURRAHAMAN.39716622@HDFCBANK&pn=MANSUR%20RAHAMAN&am=107&tn=15121361724828289090&tr=15121361724828289090`;
    await Linking.openURL(url);
  };
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.username}>Pay To:  RightEN.in</Text>
      <Image
      source={logo} 
      style={{
        width:300,
        height:undefined,
        aspectRatio:5,
      }}

      />
      <Text style={[styles.username,{marginTop:50}]}>Payee Name:  Ankan Ghosh</Text>
      <Text style={styles.amount}>Amount: ₹ 150.00</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        console.log("predd");
      }}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}

export default App

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
