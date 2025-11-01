import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();
const MenuTab = withLayoutContext(Navigator)    // auto-generate routes from file structure

export default function TabLayout() {
    return (
        <MenuTab
            tabBarPosition='bottom'
            screenOptions={{
                swipeEnabled: true,
                sceneStyle: { backgroundColor: 'transparent' },
                tabBarStyle: { backgroundColor: 'transparent' },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'white',
                tabBarIndicatorStyle: { backgroundColor: 'orange' },
            }}
        >
            <MenuTab.Screen
                name='index'
                options={{
                    title: "Currently",
                    tabBarIcon: ({ color }: { color: string }) => <Ionicons name="time-outline" size={16} color={color} />,
                }}
            />
            <MenuTab.Screen
                name='today'
                options={{
                    title: "Today",
                    tabBarIcon: ({ color }: { color: string }) => <Ionicons name="today-outline" size={16} color={color} />,
                }}
            />
            <MenuTab.Screen
                name='weekly'
                options={{
                    title: "Weekly",
                    tabBarIcon: ({ color }: { color: string }) => <Ionicons name="calendar-outline" size={16} color={color} />,
                }}
            />
        </MenuTab>
    );
}
