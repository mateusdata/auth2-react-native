import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import axios from 'axios';

const data = {
  webClientId: '726353729050-cu231380cbsr4p03p53ivf4tkponfmbi.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '726353729050-4mk6f6k9q8pljp8inrksvsr3ok2h3r0v.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
}


export default function App() {
  const [user, setUser] = useState<any>({
    userInfo: null,
    error: undefined,
  });

  useEffect(() => {
    GoogleSignin.configure(data);
  }, []);
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      console.log(userInfo);
      alert("Deu certo caralho")
      //sendTokenToBackend(userInfo.idToken)

    } catch (error: any) {
      console.log(error)
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log(error)
      }
    }
  };

  const isErrorWithCode = (error: any) => {
    return error && typeof error.code === 'string';
  };



  const sendTokenToBackend = async (idToken: any) => {
    alert(idToken)
    try {
      const response = await axios.post('https://seu-backend.com/api/authenticate', {
        idToken
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao enviar token para o backend:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Inicial</Text>
      
      <Button title='Fazer Login' onPress={_signIn} />
      
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.user?.photo }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.user?.name}</Text>
          <Text style={styles.userEmail}>{user?.user?.email}</Text>
        </View>
      </View>

      <Text selectable style={styles.userJson}>
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 20,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  userJson: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
