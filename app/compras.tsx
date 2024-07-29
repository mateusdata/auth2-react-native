import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Store() {
  return (
    <View style={styles.container}>
      <Text>Pagina de compras</Text>
      <Link href={"/login"}>login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
