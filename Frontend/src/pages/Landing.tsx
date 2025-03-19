import React from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero.js";
import firebase from "firebase/compat/app";
import { auth } from "@/Firebase/firebase.js";
import { SignUpAPI } from "@/services/api.js";
import { useNavigate } from "react-router-dom";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { HeroScrollDemo } from "@/components/Scroll-landing";
import { GoogleGeminiEffectDemo } from "@/components/gemini-power";
import { PricingDemo } from "@/components/price-component";
import { toast } from "sonner";

interface UserData {
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
  email: string | null;
}
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const { displayName, photoURL, uid, email } = result.user as UserData;

      const userData: UserData = { displayName, photoURL, uid, email };
      localStorage.setItem("user", JSON.stringify(userData));
      toast.loading("Signing in...");
      const credential =
        result.credential as firebase.auth.OAuthCredential | null;

      if (credential) {
        const { idToken } = credential as { idToken: string | null };
        const data = {
          idToken: idToken,
          displayName,
          photoURL,
          uid,
          email: email,
        };
        try {
          const res = await SignUpAPI(data);
          if (res?.status === 200) {
            navigate("/ai");
          }
          if (res?.status === 201) {
            navigate("/ai");
          }
        } catch (error) {
          console.error("Error signing in:", error);
        }
      } else {
        console.log("No credentials found");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <>
      <div>
        <HeroGeometric
          badge="A Gemini Clone"
          title1="Insight AI"
          title2="Your AI Assistant"
          description="Insight AI is your personal AI assistant. It can help you with your daily tasks and make your life easier."
          buttonText="Sign Up with Google"
          OnClick={handleGoogleSignIn}
        />
        <div className="bg-black">
          <HeroScrollDemo />
          <GoogleGeminiEffectDemo />
          <PricingDemo />
          <StackedCircularFooter />
        </div>
      </div>
    </>
  );
};

export default SignUp;
