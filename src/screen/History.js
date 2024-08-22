import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const History = ({ navigation }) => {
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
      return (
        <View>
          <Text style={{color:'black'}}>History</Text>
        </View>
      )
}

export default History

const styles = StyleSheet.create({})