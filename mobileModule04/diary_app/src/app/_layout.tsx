import { Stack } from 'expo-router';
import { Provider } from 'jotai';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
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
