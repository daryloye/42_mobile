import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { auth as firebaseAuth } from './firebase';

const androidClientId = '199707899747-goio0r0i1smd42nvanpo2fnuag1ui6ee.apps.googleusercontent.com';
const redirectUri = AuthSession.makeRedirectUri({});

export function useLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: androidClientId,
    redirectUri,
  });

  // Handle logged-in Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        router.replace('/profile');
      }
    });
    return unsubscribe;
  }, []);

  // After Google Login
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(firebaseAuth, credential)
        .then(() => router.replace('/profile'))
        .catch((error) => console.error('Firebase sign in error:', error));
    }
  }, [response]);

  return { promptAsync, request };
}

export function useLogout() {
  signOut(firebaseAuth);
}
