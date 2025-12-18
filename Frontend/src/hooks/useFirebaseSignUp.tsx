import { toast } from "sonner";
import firebase from "firebase/compat/app";
import { auth } from "@/config/firebase.js";

export const handleGoogleSignIn = async (): Promise<void> => {
    toast.loading("Signing in...");
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const { displayName, photoURL, uid, email } = result.user as UserData;
      const userData: UserData = { displayName, photoURL, uid, email };
      localStorage.setItem("user", JSON.stringify(userData));
      toast.dismiss();
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  
  interface UserData {
    displayName: string | null;
    photoURL: string | null;
    uid: string | null;
    email: string | null;
  }