import { CedarvilleCursive_400Regular, useFonts } from '@expo-google-fonts/cedarville-cursive';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();    // to load the font

export default function MainScreen() {
  const [loaded, error] = useFonts({
    CedarvilleCursive_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const handleLogin = () => {
    router.navigate('/profile');
  }

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={{ flex: 1 }}
      resizeMode='cover'
    >

      <View style={styles.container}>
        <Text style={styles.title}>Welcome to your Diary</Text>

        <Pressable style={styles.button} onPress={handleLogin}>
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
    borderColor: 'grey',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
})
