import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [ text, changeText ] = useState<string>('Simple text');

  const handlePress = () => {
    if (text === 'Simple text') {
      changeText('Hello World')
    } else {
      changeText('Simple text')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
