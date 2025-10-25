import { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Numpad } from '../components/Numpad';
import * as colours from '../config/colours';

export default function CalculatorScreen() {
  const [input, setInput] = useState<string>('0');
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <View style={{flex: 1}}>
        <Text style={[styles.expression, styles.text]}>{input}</Text>
        <Text style={[styles.result, styles.text]}>0</Text>
      </View>
      <View style={{flex: 1}}>
        <Numpad setInput={setInput} input={input}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.numpad_colour,
  },
  expression: {
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
