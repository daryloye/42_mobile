import { Stack } from "expo-router";
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { AppProvider } from '../utils/appContext';

export default function RootLayout() {
    return (
        <AppProvider>
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={{ flex: 1 }}
                resizeMode='cover'
            >
                <SafeAreaView style={styles.sides} edges={['right', 'left']}>
                    <SafeAreaView style={styles.top} edges={['top']} />

                    <StatusBar barStyle='light-content' />

                    <Header />

                    <Stack screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: 'transparent' }
                    }}
                    >
                        <Stack.Screen name="(tabs)" />
                    </Stack>

                    <SafeAreaView style={styles.bottom} edges={['bottom']} />
                </SafeAreaView>
            </ImageBackground>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    sides: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
    },
    top: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bottom: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
