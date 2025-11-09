import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import { GithubAuthProvider, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { auth as firebaseAuth } from './firebase';

const googleAndroidClientId = '199707899747-goio0r0i1smd42nvanpo2fnuag1ui6ee.apps.googleusercontent.com';
const githubClientId = 'Ov23liSoK4wgngfGtVlc';
const redirectUri = AuthSession.makeRedirectUri({});

async function fetchAccessTokenFromCode(code: string) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code
    }),
  });

  console.log(response);

  // const { access_token } = await response.json();
  return '';
}

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
      scopes: ['identity', 'user:email'],
      redirectUri,
    },
    githubDiscovery
  );


  // Google login effect
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(firebaseAuth, credential)
        .then(() => router.replace('/profile'))
        .catch((error) => console.error('Firebase Google sign in error:', error));
    }
  }, [googleResponse]);


  // GitHub login effect
  useEffect(() => {
    const signInWithGitHub = async () => {
      if (githubResponse?.type === 'success') {
        const { code } = githubResponse.params;
        
        // Exchange the code for an access token
        const accessToken = await fetchAccessTokenFromCode(code);

        const credential = GithubAuthProvider.credential(accessToken);
        signInWithCredential(firebaseAuth, credential)
          .then(() => router.replace('/profile'))
          .catch((error) => console.error('Firebase GitHub sign in error:', error));
      }
    };

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
