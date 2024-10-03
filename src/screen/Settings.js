import { ScrollView, StyleSheet, Text, View } from 'react-native'
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

      <ScrollView style={{ marginTop: 50 }}>
        <Text style={styles.heading}>Our Privacy Policy</Text>
        <Text style={styles.paragraph}>
          At RightEn, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our services.
        </Text>
        <Text style={styles.subheading}>Information Collection :</Text>
        <Text style={styles.paragraph}>
          We collect personal information, including but not limited to your name, contact details, and demographic information, when you use our services or interact with our website.
        </Text>
        <Text style={styles.subheading}>Use of Information :</Text>
        <Text style={styles.paragraph}>
          We use the information collected to provide and improve our services, process insurance applications, communicate with you, and personalize your experience. Your information may also be used for marketing purposes, but you can opt out at any time.
        </Text>
        <Text style={styles.subheading}>Data Security :</Text>
        <Text style={styles.paragraph}>
          We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
        </Text>
        <Text style={styles.subheading}>Information Sharing :</Text>
        <Text style={styles.paragraph}>
          We may share your personal information with trusted third parties, including insurance providers, service providers, and regulatory authorities, to fulfill our services or comply with legal obligations.
        </Text>
        <Text style={styles.subheading}>Cookies :</Text>
        <Text style={styles.paragraph}>
          We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings, but disabling them may affect certain functionalities of our website.
        </Text>
        <Text style={styles.subheading}>Third-Party Links :</Text>
        <Text style={styles.paragraph}>
          Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties and encourage you to review their privacy policies.
        </Text>
        <Text style={styles.subheading}>Children's Privacy :</Text>
        <Text style={styles.paragraph}>
          Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children, and if we become aware of such information, we will take steps to delete it promptly.
        </Text>
        <Text style={styles.subheading}>Changes to Privacy Policy :</Text>
        <Text style={styles.paragraph}>
          We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting on our website. We encourage you to review this Privacy Policy periodically for updates.
        </Text>
        <Text style={styles.subheading}>Consent :</Text>
        <Text style={styles.paragraph}>
          By using RightEn's services, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy.
        </Text>
        <Text style={styles.subheading}>Contact Us :</Text>
        <Text style={styles.paragraph}>
          If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us at righten.in@gmail.com
        </Text>
        <Text style={styles.paragraph}>
          Thank you for entrusting RightEn – the right place for your insurance needs – with your personal information. We are dedicated to protecting your privacy and ensuring a secure and transparent experience when using our services.
        </Text>

        <Text style={styles.heading}>Terms & Conditions</Text>

        <Text style={styles.subheading}>Eligibility</Text>
        <Text style={styles.paragraph}>
          You must be of legal age and have the authority to enter into agreements to utilize our services. By using RightEn, you confirm that you meet these criteria.
        </Text>

        <Text style={styles.subheading}>Service Description</Text>
        <Text style={styles.paragraph}>
          RightEn specializes in providing general insurance solutions tailored to your specific needs. Our services include but are not limited to insurance coverage for assets, property, health, and more.
        </Text>

        <Text style={styles.subheading}>Accuracy of Information</Text>
        <Text style={styles.paragraph}>
          You are responsible for providing accurate and complete information when using our services. RightEn is not liable for any consequences resulting from incorrect or incomplete information provided by users.
        </Text>

        <Text style={styles.subheading}>Insurance Policies</Text>
        <Text style={styles.paragraph}>
          All insurance policies offered through RightEn are subject to the terms and conditions set forth by the respective insurance providers. It is your responsibility to review and understand the terms of your insurance policy before purchase.
        </Text>

        <Text style={styles.subheading}>Financial Responsibility</Text>
        <Text style={styles.paragraph}>
          You are responsible for the payment of premiums associated with your insurance policy. Failure to pay premiums may result in the termination or lapse of your coverage.
        </Text>

        <Text style={styles.subheading}>Privacy and Security</Text>
        <Text style={styles.paragraph}>
          RightEn respects your privacy and takes security measures to protect your personal information. By using our services, you consent to the collection, use, and disclosure of your information as outlined in our Privacy Policy.
        </Text>

        <Text style={styles.subheading}>Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content and materials on RightEn's website and platforms, including logos, trademarks, and text, are the property of RightEn and protected by intellectual property laws. You agree not to use or reproduce any content without prior written consent.
        </Text>

        <Text style={styles.subheading}>Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          RightEn shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, including but not limited to loss of profits, data, or goodwill.
        </Text>

        <Text style={styles.subheading}>Modification of Terms</Text>
        <Text style={styles.paragraph}>
          RightEn reserves the right to modify these terms and conditions at any time without prior notice. Continued use of our services after such modifications constitutes your acceptance of the updated terms.
        </Text>

        <Text style={styles.subheading}>Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms and conditions shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising out of or relating to these terms shall be resolved through arbitration in [Jurisdiction].
        </Text>

        <Text style={styles.paragraph}>
          By using RightEn's services, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree with any part of these terms, you may not use our services.
        </Text>

        <Text style={styles.paragraph}>
          For any inquiries or concerns regarding these terms and conditions, please contact us at righten.in@gmail.com
        </Text>

        <Text style={styles.paragraph}>
          Thank you for choosing RightEn – the right place for your insurance needs.
        </Text>

        <Text style={styles.heading}>Refund Policy</Text>

        <Text style={styles.paragraph}>
          At RightEn, we strive to provide exceptional service and customer satisfaction. This Refund Policy outlines our guidelines regarding refunds for our general insurance services.
        </Text>

        <Text style={styles.subheading}>Eligibility for Refunds</Text>
        <Text style={styles.paragraph}>
          Refunds may be issued in accordance with the terms and conditions of the insurance policy purchased through RightEn. Eligibility for a refund is subject to the specific terms outlined in the policy document provided by the insurance provider.
        </Text>

        <Text style={styles.subheading}>Refund Requests</Text>
        <Text style={styles.paragraph}>
          To request a refund, you must contact RightEn's customer support team and provide relevant details, including your policy number, reason for the refund request, and any supporting documentation as required.
        </Text>

        <Text style={styles.subheading}>Refund Processing</Text>
        <Text style={styles.paragraph}>
          Refunds will be processed within 72 hours based on the terms and conditions of the insurance policy and the specific circumstances of the refund request. RightEn will facilitate the refund process on behalf of the insurance provider, adhering to their policies and procedures.
        </Text>

        <Text style={styles.subheading}>Non-Refundable Fees</Text>
        <Text style={styles.paragraph}>
          Certain fees associated with the purchase or processing of insurance policies, such as administrative fees or service charges, may be non-refundable. These fees will be clearly outlined at the time of purchase.
        </Text>

        <Text style={styles.subheading}>Timelines for Refunds</Text>
        <Text style={styles.paragraph}>
          The timeline for processing refunds varies depending on the insurance provider and the nature of the refund request. RightEn will endeavor to process refunds in a timely manner and keep you informed of the progress throughout the process.
        </Text>

        <Text style={styles.subheading}>Dispute Resolution</Text>
        <Text style={styles.paragraph}>
          In the event of a dispute regarding a refund, RightEn will work with the insurance provider and the customer to resolve the issue amicably and fairly. We are committed to ensuring that our customers receive the refunds they are entitled to under the terms of their insurance policies.
        </Text>

        <Text style={styles.subheading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns regarding our refund policy or need assistance with a refund request, please contact RightEn's customer support team at righten.in@gmail.com
        </Text>

        <Text style={styles.paragraph}>
          Thank you for choosing RightEn – the right place for your insurance needs. We are dedicated to providing you with the highest level of service and assistance throughout your insurance journey.
        </Text>
      </ScrollView>
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
    fontWeight: 'bold',
    color: 'black'
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
    borderBottomWidth:2
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'black'

  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: 'black'

  },
});