import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLogin } from '../utils/auth';
import { auth as firebaseAuth } from '../utils/firebase';

export default function LoginScreen() {
  const { googlePromptAsync, googleRequest, githubPromptAsync, githubRequest } = useLogin();

  // Handle logged-in Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        router.replace('/profile');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name='library' size={50} color="grey" />
      <View style={{ marginBottom: 50, marginTop: 10, gap: 20, }}>
        <Text style={[styles.text, { fontSize: 26 }]}>Welcome</Text>
        <Text style={[styles.text, { fontSize: 18 }]}>Log in to continue</Text>
      </View>

      <Pressable style={{ width: '60%' }} onPress={() => googlePromptAsync()} disabled={!googleRequest}>
        <View style={styles.button}>
          <Ionicons name='logo-google' size={30} color="white" />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </View>
      </Pressable>

      <Pressable style={{ width: '60%' }} onPress={() => githubPromptAsync()} disabled={!githubRequest}>
        <View style={styles.button}>
          <Ionicons name='logo-github' size={30} color="white" />
          <Text style={styles.buttonText}>Continue with GitHub</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  }
})
