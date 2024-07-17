import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import React from 'react';
import { auth } from '../Firebase/firebase';
import css from '../style/signup.module.css'
import Navbar from '@/components/Navbar';
import HeroSection from '../components/HeroSection.js';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {

  const navigate = useNavigate();
  interface UserData {
    displayName: string | null;
    photoURL: string | null;
    uid: string | null;
  }

  const handleGoogleSignIn = async () : Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const { displayName, photoURL, uid } = result.user as UserData;

      const credential = result.credential as firebase.auth.OAuthCredential | null;

      if (credential) {
        const {idToken} = credential as {idToken: string | null};
        console.log(displayName, photoURL, uid);
        console.log(idToken);
        navigate('/ai');
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
    <Navbar/>
    <HeroSection  handleGoogleSignIn={handleGoogleSignIn} />
    </div>
    </>
  );
};

export default SignUp;
