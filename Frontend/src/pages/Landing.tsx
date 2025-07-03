import React from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero.js";
import firebase from "firebase/compat/app";
import { auth } from "@/Firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { HeroScrollDemo } from "@/components/Scroll-landing";
import { GoogleGeminiEffectDemo } from "@/components/gemini-power";
import { PricingDemo } from "@/components/price-component";
import { toast } from "sonner";
import { ReactLenis, useLenis } from "lenis/react";

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
const SignUp: React.FC = () => {
  useLenis(() => {});

  const navigate = useNavigate();

  return (
    <>
      <ReactLenis root>
        <div>
          <HeroGeometric
            badge="A Gemini Clone"
            title1="Insight AI"
            title2="Your AI Assistant"
            description="Insight AI is your personal AI assistant. It can help you with your daily tasks and make your life easier."
            buttonText="Try Now"
            OnClick={() => {
              navigate("/ai");
            }}
          />
          <div className="bg-black">
            <HeroScrollDemo />
            <GoogleGeminiEffectDemo />
            <PricingDemo />
            <StackedCircularFooter />
          </div>
        </div>
      </ReactLenis>
    </>
  );
};

export default SignUp;
