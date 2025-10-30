import { Stack } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Header } from '../components/Header';
import { AppProvider, useAppContext } from '../utils/appContext';

export default function RootLayout() {
    const { setLocationList } = useAppContext();
    
    return (
        <AppProvider>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    setLocationList(null);
                }}>
                <View style={{ flex: 1 }}>
                    <Header />
                    <Stack screenOptions={{ headerShown: false }} >
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                </View>
            </TouchableWithoutFeedback>
        </AppProvider>
    );
}