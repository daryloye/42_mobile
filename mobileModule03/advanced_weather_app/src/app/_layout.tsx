import { Stack } from "expo-router";
import { ImageBackground, StatusBar, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { AppProvider } from '../utils/appContext';


function AppLayout() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={{ flex: 1 }}
                resizeMode='cover'
            >
                <Header />
                <Stack screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'rgba(0,0,0,0.5)' }
                }} >
                    <Stack.Screen name="(tabs)" />
                </Stack>
            <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} edges={['bottom']} />
            </ImageBackground>
        </View>
    )
}

export default function RootLayout() {
    return (
        <AppProvider>
            <AppLayout />
        </AppProvider>
    );
}
