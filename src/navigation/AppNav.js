import { View, Text, SafeAreaView } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
// import TabNavigator from './TabNavigator';
import TabNavigator from './TabNavigator';


const AppNav = () => {
  return (
    // <SafeAreaView>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    // </SafeAreaView>

  )
}

export default AppNav;