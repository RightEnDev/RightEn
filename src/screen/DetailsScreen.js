import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailsScreen = ({route}) => {
    const { service_code } = route.params;
    console.log(service_code);

  return (
    <View>
      <Text>DetailsScreen</Text>
      <Text style={{color:'black'}}>service_code ID: {service_code}</Text>

    </View>
  )
}

export default DetailsScreen;

const styles = StyleSheet.create({})