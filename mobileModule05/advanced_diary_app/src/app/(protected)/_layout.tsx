import { Ionicons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth as firebaseAuth } from '../../utils/firebase';

export default function TabLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        router.replace('/login');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'shift', 
        sceneStyle: { backgroundColor: 'white' },
      }}
    >
      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <Ionicons name="person" size={24} color='black' />,
        }}
      />
      <Tabs.Screen
        name='agenda'
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <Ionicons name="calendar-clear" size={24} color='black' />,
        }}
      />
    </Tabs>
  );
}