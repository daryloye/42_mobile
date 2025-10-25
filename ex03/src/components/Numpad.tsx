import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as colours from '../utils/colours';


type NumpadProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
}

export function Numpad({ setInput, setResult }: NumpadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <NumpadButton text="7" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="8" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="9" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="C" color="red" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="AC" color="red" setInput={setInput} setResult={setResult}/>
      </View>
      <View style={styles.row}>
        <NumpadButton text="4" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="5" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="6" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="+" color="white" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="-" color="white" setInput={setInput} setResult={setResult}/>
      </View>
      <View style={styles.row}>
        <NumpadButton text="1" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="2" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="3" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="x" color="white" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="/" color="white" setInput={setInput} setResult={setResult}/>
      </View>
      <View style={styles.row}>
        <NumpadButton text="0" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="." color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="00" color="black" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="-" color="white" setInput={setInput} setResult={setResult}/>
        <NumpadButton text="" color="white" setInput={setInput} setResult={setResult}/>
      </View>
    </View>
  );
}

type NumpadButtonProps = {
    text: string;
    color: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<string>>;
};

function NumpadButton({ text, color, setInput, setResult }: NumpadButtonProps) {  


  const handleInput = (text: string) => {
    console.log("button pressed:", text);
    setInput(prev => {
      if (typeof text === "number") {
        return prev + text;
      } else if (text === "AC") {
        // clear input and result
        setResult('');
        return '';
      } else if (text === "C") {
        // remove last character from input
        if (prev !== "") {
          return prev.substring(0, prev.length - 1);
        }
      } else if (text === '.') {
        if (prev !== '' &&
          typeof 
        )
      }
      return prev + text
    });
  }
  
  return (
    <Pressable
      style={styles.numpadButton}
      onPress={() => handleInput(text) }
    >
      <Text style={[styles.text, { color: color }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.numpad_colour,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    numpadButton: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
})