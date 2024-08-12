import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Compras() {
  return (
    <View style={styles.container}>
      <Text>pagina de Compras</Text>
      <Link href={"/"}>index</Link>
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
