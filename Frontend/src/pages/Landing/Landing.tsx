import React from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero.js";
import { StackedCircularFooter } from "@/pages/Landing/components/StackedCircularFooter";
import { HeroScrollComponent } from "@/pages/Landing/components/Scroll-landing";
import { GoogleGeminiEffectComponent } from "@/pages/Landing/components/gemini-power-effect";
import PricingComponent from "@/components/price-component";
import { ReactLenis } from "lenis/react";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const LandingPage: React.FC = () => {
  useSmoothScroll();
  return (
    <>
      <ReactLenis root>
        <div>
          <HeroGeometric
            badge="Powered by OpenAI"
            title1="Insight AI"
            title2="Your AI Assistant"
            description="Insight AI is your personal AI assistant. It can help you with your daily tasks and make your life easier."
            buttonText="Try Now"
            buttonLink="/ai"
          />
          <div className="bg-black">
            <HeroScrollComponent />
            <GoogleGeminiEffectComponent />
            <PricingComponent />
            <StackedCircularFooter />
          </div>
        </div>
      </ReactLenis>
    </>
  );
};

export default LandingPage;
