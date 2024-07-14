import firebase from 'firebase/compat/app';
import React from 'react';
import { auth } from '../Firebase/firebase.ts';


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
      console.log(displayName, photoURL, uid);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignUp;
