import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCV4T5ZVBRbpRRxTy8KmkAOus9dRTEUpwY",
  authDomain: "insightai-b93cb.firebaseapp.com",
  projectId: "insightai-b93cb",
  storageBucket: "insightai-b93cb.appspot.com",
  messagingSenderId: "657237307881",
  appId: "1:657237307881:web:370ce5ccd003ffaa615b78",
  measurementId: "G-Z99JYVGYMG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();