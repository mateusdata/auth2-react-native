import React, { useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet, Button, ActivityIndicator, Pressable, Image } from 'react-native';
import { StripeProvider, PlatformPay, PlatformPayButton, confirmPlatformPayPayment, usePlatformPay } from '@stripe/stripe-react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await axios.post(' https://7c6c-181-216-222-58.ngrok-free.app/create-payment-intent');
    const { clientSecret } = await response.data;
    console.log(clientSecret);
    return clientSecret;
  };

  const pay = async () => {
    try {
      const clientSecret = await fetchPaymentIntentClientSecret();

      const { error } = await confirmPlatformPayPayment(
        clientSecret,
        {
          googlePay: {
            testEnv: true,
            merchantName: 'Data Compras INC',
            merchantCountryCode: 'BR',
            currencyCode: 'brl',
            billingAddressConfig: {
              format: PlatformPay.BillingAddressFormat.Full,
              isPhoneNumberRequired: true,
              isRequired: true,
            },
          },
        }
      );

      if (error) {
        Alert.alert(error.code, error.message);

        console.log(error.code + error.message);
        return;
      }

      Alert.alert('Success', 'The payment was confirmed successfully.');
      console.log('Deu certo');
    } catch (err) {
      // Handle any unexpected errors that occur
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error('Unexpected error:', err);
    }
  };


  const fetchPublishableKey = async () => {
    //setPublishableKey("pk_test_51PkZocF3eT0VBesaSkxkDLEKMJuMgzSPXtLh1pWBSe2U8Cv9NiAFbgkem6VoqbaNJpkp3C2sgYBpGMxDkmMp7phS00hK9OiRlo");

    try {
      const response = await axios.get(' https://7c6c-181-216-222-58.ngrok-free.app/publishable-key');
      setTimeout(() => {
        setPublishableKey(response.data);

      }, 0);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching publishable key:', error);
      Alert.alert('Error', 'Failed to fetch publishable key');
    }

  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);


  if (!publishableKey) {
    return (
      <View >
        <Text>Carregando... </Text>
        <ActivityIndicator size={50} color={"blue"} />
      </View>
    );
  }
  return (
    <View className='flex-1 p-4'>
      <StatusBar animated style='auto' />
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="farofa" // required for 3D Secure and bank redirects
      >
        <View>
          <View className='items-center rounded-3xl justify-center border border-blue-600 my-7 h-52'>
            <Text >Batata Frita com Calinha d'Água</Text>
            <Text >R$10,00 </Text>
          </View>

          <Pressable android_ripple={{ color: "blue" }}
            className='bg-gray-950  items-center justify-center rounded-xl flex-row top-3'
            onPress={pay}>
            <Text className='text-white text-lg'>
              Pagar com o google 
            </Text>
            <Image 
            source={{ uri: "https://static.vecteezy.com/system/resources/previews/021/496/254/original/google-pay-logo-symbol-white-design-illustration-with-black-background-free-vector.jpg" }} 
            className='h-12 w-12'
            resizeMode='stretch'
            />
          </Pressable>
        </View>
      </StripeProvider>
    </View>
  );
};


export default App;
