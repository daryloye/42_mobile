import { Stack } from "expo-router";
import { View } from "react-native";
import { Header } from '../components/Header';
import { AppProvider } from '../utils/appContext';

function AppLayout() {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Stack screenOptions={{ headerShown: false }} >
                <Stack.Screen name="(tabs)" />
            </Stack>
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