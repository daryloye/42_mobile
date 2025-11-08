import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLogin } from '../utils/login';

export default function MainScreen() {
  const { promptAsync, request } = useLogin();

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={{ flex: 1 }}
      resizeMode='cover'
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your Diary</Text>

        <Pressable style={styles.button} onPress={() => promptAsync()} disabled={!request}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
})
