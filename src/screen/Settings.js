import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BackHandler } from 'react-native';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
import Toast from 'react-native-toast-message';

import { useFocusEffect } from '@react-navigation/native';
const Settings = ({ navigation }) => {
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
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello 👋',
      text2: 'Password change successfully',

    });
  };
  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Oops! 😔',
      text2: 'Something went wrong. Please try again.',
    });
  };

  const handleSubmit = async () => {
    try {
      const us_id = await AsyncStorage.getItem('us_id');
      console.log(us_id);
      if (newPassword.length < 6 || confirmPassword.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long.');
        return;
      }
      if (newPassword === '' || confirmPassword === '') {
        Alert.alert('Error', 'Please fill in both fields');
        return;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      // Handle password change logic here
      const response = await axios.post('https://righten.in/api/users/update_password',
        qs.stringify({
          user_id: us_id,
          password: newPassword,
          cpassword: confirmPassword
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log(response.data.status);
      if (response.data.status) {
        await AsyncStorage.setItem('userPassword', newPassword);
        showSuccessToast();
        setTimeout(() => {
          setNewPassword('');
          setConfirmPassword('');
          navigation.navigate('main');
        }, 2000);
        // navigation.navigate('main');

      }
      else {
        showErrorToast();
      }
    } catch (error) {
      showErrorToast();
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <View
          style={{
            position: 'relative',
            zIndex: 10,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Toast />
        </View>

        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter New Password"
          placeholderTextColor="#888"

        />

        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm New Password"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#d9d9d9',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});