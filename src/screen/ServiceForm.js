import { StyleSheet, Text, View, ActivityIndicator, FlatList, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { width } = Dimensions.get('window');
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const ServiceForm = ({ route, navigation }) => {
    const { service_code, service_data, app_icon } = route.params;
    console.log("=======================service data ====================", service_code);
    console.log(service_data);
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('main');
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navigation])
    );
    const [panType, setPanType] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [mobileNo, setMobileNo] = useState('');

    const handleSubmit = () => {
        // Handle form submission here
        console.log('Submitted Data:', { panType, name, dob, fatherName, mobileNo });
    };

    return (
        <View style={styles.container}>
                        <Text style={styles.label}>form</Text>


            {/* <Text style={styles.label}>Pan Type</Text>
            <TextInput
                style={styles.input}
                value={panType}
                onChangeText={setPanType}
                placeholder="Enter Pan Type"
                placeholderTextColor="gray"
            />

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Name"
                placeholderTextColor="gray"
            />

            <Text style={styles.label}>DOB</Text>
            <TextInput
                style={styles.input}
                value={dob}
                onChangeText={setDob}
                placeholder="Enter DOB"
                placeholderTextColor="gray"
            />

            <Text style={styles.label}>Father's Name</Text>
            <TextInput
                style={styles.input}
                value={fatherName}
                onChangeText={setFatherName}
                placeholder="Enter Father's Name"
                placeholderTextColor="gray"
            />

            <Text style={styles.label}>Mobile no</Text>
            <TextInput
                style={styles.input}
                value={mobileNo}
                onChangeText={setMobileNo}
                placeholder="Enter Mobile Number"
                placeholderTextColor="gray"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> */}
        </View>
    );
}

export default ServiceForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        color: 'black',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'black',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
