import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, BackHandler, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';
const { width, height } = Dimensions.get('window');
import { SvgXml } from 'react-native-svg';
import { mobile_svg, settingsSVG, profileSVG, reportSVG, eye, eyeoff, nameSVG, DOBSVG, datepicker, fatherNameSVG, MobileSVG } from '../../assets/ALLSVG';
import Type1 from '../ServiceForm/Type1';
import Type1_1 from '../ServiceForm/Type1_1';
import Type2 from '../ServiceForm/Type2';
import Type3 from '../ServiceForm/Type3';
import Type4 from '../ServiceForm/Type4';
import Type5 from '../ServiceForm/Type5';

// import { useIsFocused } from '@react-navigation/native';

const ServiceForm = ({ route, navigation }) => {
    // const isFocused = useIsFocused();

    const { service_code, service_data, app_icon,offer_price } = route.params;
    // console.log("*************************************");
    // console.log(service_data);

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
    if (service_data.form_service_code === "REPAN" && (service_data.form_sub_service_id === '3' ||
        service_data.form_sub_service_id === '5' ||
        service_data.form_sub_service_id === '27' ||
        service_data.form_sub_service_id === '28'
    )) {
        service_data.fileUploadURl="https://righten.in/api/services/pancard/upload"
        return (
            <Type1
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/pancard/save"
                cardtype="Pan"

            />
        )
    }
    if (service_data.form_service_code === "REPAN" && service_data.form_sub_service_id === '4' ) {
        service_data.fileUploadURl="https://righten.in/api/services/pancard/upload"

        return (
            <Type1_1
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/pancard/save"
                cardtype="Pan"

            />
        )
    }
    if (service_data.form_service_code === "REIN" ) {
        service_data.fileUploadURl="https://righten.in/api/services/insurance/upload"
        return (
            <Type2
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/insurance/save"
                cardtype="Insurance"
                
            />
        )
    }
    if (service_data.form_service_code === "REITR" ) {
        service_data.fileUploadURl="https://righten.in/api/services/income_tax/upload"
        return (
            <Type3
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/income_tax/save"
                cardtype="ITR"
                
            />
        )
    }
    if (service_data.form_service_code === "REGST" ) {
        service_data.fileUploadURl="https://righten.in/api/services/gst/upload"
        return (
            <Type3
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/gst/save"
                cardtype="GST"
                
            />
        )
    }
    if (service_data.form_service_code === "REFSSAI" ) {
        service_data.fileUploadURl="https://righten.in/api/services/fssai/upload"
        return (
            <Type3
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/fssai/save"
                cardtype="GST"
                
            />
        )
    }
    if (service_data.form_service_code === "REPANS" ) {
        service_data.fileUploadURl="https://righten.in/api/services/surrander/upload"
        return (
            <Type4
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/surrander/save"
                cardtype="SURRANDER"
                
            />
        )
    }
    if (service_data.form_service_code === "REPAS" ) {
        service_data.fileUploadURl="https://righten.in/api/services/passport/upload"
        return (
            <Type5
                service_data={service_data}
                label={`${service_data.name} @ ${service_data.offer_price}`}
                form_service_code={service_data.form_service_code}
                form_service_id={service_data.form_service_id}
                form_sub_service_id={service_data.form_sub_service_id}
                navigation={navigation}
                formSubmitUrl="https://righten.in/api/services/passport/save"
                cardtype="Passport"
                
            />
        )
    }


    return (
       null
    );


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
