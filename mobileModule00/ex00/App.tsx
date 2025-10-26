import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  const handlePress = () => {
    console.log('Button Pressed');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Simple text</Text>
      <Button title="Click me" onPress={handlePress} />
      <StatusBar style="auto" />
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
  text: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 24,
    padding: 10,
  }
});
