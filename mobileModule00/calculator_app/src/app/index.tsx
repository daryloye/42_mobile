import { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Numpad } from '../components/Numpad';
import * as colours from '../utils/colours';

export default function CalculatorScreen() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <View style={{flex: 1}}>
        <Text style={[styles.input, styles.text]}>{input}</Text>
        <Text style={[styles.result, styles.text]}>{result}</Text>
      </View>
      <View style={{flex: 1}}>
        <Numpad setInput={setInput} setResult={setResult}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.numpad_colour,
  },
  input: {
    height: 60,
    backgroundColor: colours.display_colour,
  },
  result: {
    flex: 1,
    backgroundColor: colours.display_colour,
  },
  text: {
    textAlign: "right",
    color: "white",
    fontSize: 24,
    padding: 10,
  },
});
