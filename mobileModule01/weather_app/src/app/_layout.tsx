import { Stack } from "expo-router";
import * as colours from '../utils/colours';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: colours.numpad_colour,
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Calculator" }} />
        </Stack>
    );
}