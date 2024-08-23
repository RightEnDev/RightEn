import { StyleSheet, Text, View, TextInput, TouchableOpacity, BackHandler, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
import { SvgXml } from 'react-native-svg';
import { mobile_svg, settingsSVG, profileSVG, reportSVG, eye, eyeoff, nameSVG, DOBSVG, datepicker, fatherNameSVG, MobileSVG } from '../../assets/ALLSVG';
import Type1 from '../ServiceForm/Type1';
// import { useIsFocused } from '@react-navigation/native';

const ServiceForm = ({ route, navigation }) => {
    // const isFocused = useIsFocused();

    const { service_code, service_data, app_icon } = route.params;
    console.log("*************************************");
    console.log(service_data);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('main');
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navigation])
    );
return(
    <Type1 label={service_data.name +" @ "+ service_data.offer_price} cardtype="Pan" />
)
    
};

export default ServiceForm;

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
        justifyContent:'center',
        alignItems:'center'

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
        marginTop:10,
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight:'bold'
    },
});
