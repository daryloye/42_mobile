import { Stack } from "expo-router";
import { Header } from '../components/Header';
import { CoordinateProvider } from '../utils/coordinateProvider';

export default function RootLayout() {
    return (
        <CoordinateProvider>
            <Header />
            <Stack
                screenOptions={{
                    headerShown: false
                    // headerTitle: () => <Header />,
                    // headerStyle: {
                    //     backgroundColor: '#5b5d72',
                    // },
                }}
            >
                <Stack.Screen name="(tabs)" />
            </Stack>
        </CoordinateProvider>
    );
}