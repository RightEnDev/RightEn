import { StyleSheet, Text, View, TextInput, TouchableOpacity, BackHandler, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
import { SvgXml } from 'react-native-svg';
import { mobile_svg, settingsSVG, profileSVG, reportSVG, eye, eyeoff, nameSVG, DOBSVG, datepicker, fatherNameSVG, MobileSVG, serviceSVG } from '../../assets/ALLSVG';

const Type1 = ({ label, cardtype }) => {
    const [panType, setPanType] = useState('');
    const [name, setName] = useState('');

    const [DD, setDD] = useState('');
    const [MM, setMM] = useState('');
    const [YYYY, setYYYY] = useState('');
    const [dob, setDob] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [fatherName, setFatherName] = useState('');
    const [mobileNo, setMobileNo] = useState('');

    const handleDateChange = (event, date) => {
        setShowPicker(false);
        if (date) {
            const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
            setDob(formattedDate);
            setSelectedDate(date);
        }
    };

    const handleSubmit = () => {
        // Handle form submission here
        const dateOfBirth = DD+'-'+MM+'-'+YYYY
        console.log('Submitted Data:', { panType, name, dateOfBirth, fatherName, mobileNo });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust offset if needed
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.label}>{cardtype} Type <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.input_view}>
                    <View style={styles.svg_box}>

                        <SvgXml xml={serviceSVG} />
                    </View>
                    <Text style={[styles.input, { fontSize: 24, fontWeight: 'bold', fontFamily: 'BAUHS93', }]}>{label}</Text>

                </View>

                <Text style={styles.label}>Name <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.input_view}>
                    <View style={styles.svg_box}>

                        <SvgXml xml={nameSVG} />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter Name"
                        placeholderTextColor="black"
                    />
                </View>

                <Text style={styles.label}>DOB (DD/MM/YYYY) <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.input_view}>
                    <View style={styles.svg_box}>

                        <SvgXml xml={DOBSVG} />
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingLeft:5,paddingBottom:5}}>
                    <TextInput
                        style={[styles.input, { width: '15%',borderBottomWidth:2,borderColor:'#000' }]}
                        value={DD}
                        onChangeText={setDD}
                        placeholderTextColor="black"
                        maxLength={2}
                        keyboardType="numeric"
                        placeholder="DD"

                    />
                    <Text style={{fontSize:20}}>/</Text>
                    <TextInput
                        style={[styles.input, { width: '20%',borderBottomWidth:2,borderColor:'#000' }]}
                        value={MM}
                        onChangeText={setMM}
                        placeholderTextColor="black"
                        maxLength={2}
                        keyboardType="numeric"
                        placeholder="MM"

                    />
                    <Text style={{fontSize:20}}>/</Text>
                    <TextInput
                        style={[styles.input, { width: '30%',borderBottomWidth:2,borderColor:'#000' }]}
                        value={YYYY}
                        onChangeText={setYYYY}
                        placeholderTextColor="black"
                        maxLength={4}
                        keyboardType="numeric"
                        placeholder="YYYY"

                    />
                    </View>

                </View>

                <Text style={styles.label}>Father's Name <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.input_view}>
                    <View style={styles.svg_box}>

                        <SvgXml xml={fatherNameSVG} />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={fatherName}
                        onChangeText={setFatherName}
                        placeholder="Enter Father's Name"
                        placeholderTextColor="black"
                    />
                </View>

                <Text style={styles.label}>Mobile no <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.input_view}>
                    <View style={styles.svg_box}>

                        <SvgXml xml={MobileSVG} />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={mobileNo}
                        onChangeText={setMobileNo}
                        placeholder="Enter Mobile Number"
                        placeholderTextColor="black"
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Type1

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        color: 'black',
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        marginBottom: 15,

    },
    input_view: {
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        // alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15,
    },
    svg_box: {
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#d2d2d2',
        justifyContent: 'center',
        alignItems: 'center'

    },

    input: {
        height: 40,
        width: '80%',
        alignItems: 'center',
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'black',
        fontFamily: 'BAUHS93',
        borderColor: '#ccc',
        // backgroundColor:'red'
    },
    button: {
        backgroundColor: '#FFCB0A',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,

    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
});