import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { GithubAuthProvider, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { auth as firebaseAuth } from './firebase';

const googleAndroidClientId = '199707899747-goio0r0i1smd42nvanpo2fnuag1ui6ee.apps.googleusercontent.com'
const githubClientId = 'Ov23liSoK4wgngfGtVlc';
const githubClientSecret = Constants.expoConfig?.extra?.githubClientSecret;
if (!githubClientSecret) {
  throw Error('githubClientSecret not loaded');
} else {
  console.log('githubClientSecret loaded');
}

const redirectUri = AuthSession.makeRedirectUri({}); 

export function useLogin() {
  // Google OAuth
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    clientId: googleAndroidClientId,
    redirectUri,
  });


  // Github OAuth
  const githubDiscovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  };

  const [githubRequest, githubResponse, githubPromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      scopes: ['identity', 'user:email'],
      redirectUri,
    },
    githubDiscovery
  );


  // Google login effect
  useEffect(() => {
    const signInWithGoogle = async () => {
      try {
        if (googleResponse?.type === 'success') {
          const { id_token } = googleResponse.params;

          const credential = GoogleAuthProvider.credential(id_token);
          await signInWithCredential(firebaseAuth, credential);
          router.replace('/profile');
        }
      } catch (error: any) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          Alert.alert('Error', 'This email is already associated with another sign-in method.');
        } else {
          console.error('Firebase Google sign in error:', error);
        }
      }
    }
    signInWithGoogle();
  }, [googleResponse]);


  // GitHub login effect
  useEffect(() => {
    const signInWithGitHub = async () => {
      try {
        if (githubRequest && githubResponse?.type === 'success') {
          const result = await AuthSession.exchangeCodeAsync(
            {
              clientId: githubClientId,
              clientSecret: githubClientSecret,
              code: githubResponse.params.code,
              redirectUri,
              extraParams: githubRequest.codeVerifier
                ? { code_verifier: githubRequest.codeVerifier }
                : undefined,
            },
            githubDiscovery
          )

          const credential = GithubAuthProvider.credential(result.accessToken);
          await signInWithCredential(firebaseAuth, credential);
          router.replace('/profile');
        }
      } catch (error: any) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          Alert.alert('Error', 'This email is already associated with another sign-in method.');
        } else {
          console.error('Firebase GitHub sign in error:', error);
        }
      };
    }
    signInWithGitHub();
  }, [githubResponse]);

  return {
    googlePromptAsync,
    googleRequest,
    githubRequest,
    githubPromptAsync,
  };
}

export function useLogout() {
  signOut(firebaseAuth);
}
