import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { AppProvider } from '../utils/appContext';

export default function RootLayout() {
    return (
        <AppProvider>
            <SafeAreaView style={styles.sides} edges={['right', 'left']}>
                <SafeAreaView style={styles.top} edges={['top']} />

                <StatusBar barStyle='light-content' />

                <Header />

                <Stack screenOptions={{ headerShown: false }} >
                    <Stack.Screen name="(tabs)" />
                </Stack>

                <SafeAreaView style={styles.bottom} edges={['bottom']} />
            </SafeAreaView>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: '#5b5d72',
    },
    bottom: {
        backgroundColor: 'white',
    },
    sides: {
        flex: 1,
        backgroundColor: 'black',
        zIndex: 10,
    },
});
