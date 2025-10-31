import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();
const MenuTab = withLayoutContext(Navigator)    // auto-generate routes from file structure

export default function TabLayout() {
    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
            <MenuTab
                tabBarPosition='bottom'
                screenOptions={{
                    swipeEnabled: true,
                }}
            >
                <MenuTab.Screen
                    name='index'
                    options={{
                        title: "Currently",
                        tabBarIcon: () => <Ionicons name="time-outline" size={16} />,
                    }}
                />
                <MenuTab.Screen
                    name='today'
                    options={{
                        title: "Today",
                        tabBarIcon: () => <Ionicons name="today-outline" size={16} />,
                    }}
                />
                <MenuTab.Screen
                    name='weekly'
                    options={{
                        title: "Weekly",
                        tabBarIcon: () => <Ionicons name="calendar-outline" size={16} />,
                    }}
                />
            </MenuTab>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});