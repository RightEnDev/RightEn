import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailsScreen = ({route}) => {
    const { itemId } = route.params;

  return (
    <View>
      <Text>DetailsScreen</Text>
      <Text>Item ID: {itemId}</Text>

    </View>
  )
}

export default DetailsScreen;

const styles = StyleSheet.create({})