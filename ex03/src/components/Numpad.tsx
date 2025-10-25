import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as colours from '../config/colours';


type NumpadProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export function Numpad({ input, setInput }: NumpadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <NumpadButton text="7" color="black" />
        <NumpadButton text="8" color="black" />
        <NumpadButton text="9" color="black" />
        <NumpadButton text="C" color="red" />
        <NumpadButton text="AC" color="red" />
      </View>
      <View style={styles.row}>
        <NumpadButton text="4" color="black" />
        <NumpadButton text="5" color="black" />
        <NumpadButton text="6" color="black" />
        <NumpadButton text="+" color="white" />
        <NumpadButton text="-" color="white" />
      </View>
      <View style={styles.row}>
        <NumpadButton text="1" color="black" />
        <NumpadButton text="2" color="black" />
        <NumpadButton text="3" color="black" />
        <NumpadButton text="x" color="white" />
        <NumpadButton text="/" color="white" />
      </View>
      <View style={styles.row}>
        <NumpadButton text="0" color="black" />
        <NumpadButton text="." color="black" />
        <NumpadButton text="00" color="black" />
        <NumpadButton text="-" color="white" />
        <NumpadButton text="" color="white" />
      </View>
    </View>
  );
}

type NumpadButtonProps = {
    text: string;
    color: string;
};

function NumpadButton({ text, color }: NumpadButtonProps) {
    return (
        <Pressable 
            style={styles.numpadButton}
            onPress={() => console.log('button pressed:', text)}
        >
            <Text style={[styles.text, {color: color}]}>{text}</Text>
        </Pressable>
    )
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