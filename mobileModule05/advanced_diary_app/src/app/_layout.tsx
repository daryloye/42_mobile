import { CedarvilleCursive_400Regular, useFonts } from '@expo-google-fonts/cedarville-cursive';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Provider } from 'jotai';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({
    CedarvilleCursive_400Regular,
    ...Ionicons.font,
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle='light-content' />

        <Stack screenOptions={{
          headerShown: false,
          animation: 'none',
        }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='login' />
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
