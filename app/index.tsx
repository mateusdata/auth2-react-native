import { confirmPlatformPayPayment, PlatformPay, PlatformPayButton, StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { api } from '../config/api';
import axios from 'axios';

function App() {
  const [publishableKey, setPublishableKey] = useState('');


  const fetchPaymentIntentClientSecret = async () => {
    const response = await api.post("/create-payment-intent");
    const { clientSecret } = await response.data;
    console.log(clientSecret);

    return clientSecret;
  };


  const pay = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    const { error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        googlePay: {
          testEnv: true,
          merchantName: 'Data compras INC',
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
      console.log(error.code + error.message)
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
    console.log("Deu certo")
  };

  const fetchPublishableKey = async () => {

    try {

      const response = await api.get("/publishable-key");
      setPublishableKey(response.data);
      console.log(response.data)

    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="datacompras" // required for 3D Secure and bank redirects
    >
      <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={pay}
        style={{
          width: '100%',
          height: 50,
        }}
      />
    </StripeProvider >
  );
}
export default App