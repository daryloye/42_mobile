import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { database } from '../database';

export default function ProfileScreen() {
  useEffect(() => {
    database();
  }, []);

  return (
    <View>
      <Text>
        Profile
      </Text>
    </View>
  )
}