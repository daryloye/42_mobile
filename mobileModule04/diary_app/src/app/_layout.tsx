import { CedarvilleCursive_400Regular, useFonts } from '@expo-google-fonts/cedarville-cursive';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'jotai';
import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({ CedarvilleCursive_400Regular });
  
  // Load font
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />

        <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='profile' />
        </Stack>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
})
