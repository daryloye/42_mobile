import { Stack } from "expo-router";
import { Header } from '../components/Header';
import { SearchProvider } from '../components/SearchProvider';

export default function RootLayout() {
    return (
        <SearchProvider>
            <Stack
                screenOptions={{
                    headerTitle: () => <Header />,
                    headerStyle: {
                        backgroundColor: '#5b5d72',
                    },
                }}
            >
                <Stack.Screen name="(tabs)" />
            </Stack>
        </SearchProvider>
    );
}