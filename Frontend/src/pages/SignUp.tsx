import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import React from 'react';
import { auth } from '../Firebase/firebase';
import { Button } from "../components/ui/button"
import css from '../style/signup.module.css'

const SignUp: React.FC = () => {
  interface UserData {
    displayName: string | null;
    photoURL: string | null;
    uid: string | null;
  }

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const { displayName, photoURL, uid } = result.user as UserData;

      const credential = result.credential as firebase.auth.OAuthCredential | null;

      if (credential) {
        const idToken = credential.idToken;
        const accessToken = credential.accessToken;
        console.log(displayName, photoURL, uid);
        console.log(idToken, accessToken);
      } else {
        console.log('No credentials found');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    } 
  };

  return (
    <>
    <div className={`${css.signup_page} h-screen `} >
    </div>
    </>
  );
};

export default SignUp;
