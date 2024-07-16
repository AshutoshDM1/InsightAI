import GoogleButton from "react-google-button";
import '@/App.css'

interface HeroSectionProps {
  handleGoogleSignIn: () => Promise<void>; 
}

const HeroSection: React.FC<HeroSectionProps> = ({handleGoogleSignIn}) => {
  return (
    <div className="hero-section h-94h w-full  flex ">
      <div className="h-full w-50w flex justify-center  items-center flex-col  ">
        <h1 className="hero-section-text h-10h w-60w text-white font-bold text-8vh text-center ">
          Insight AI
        </h1>
        <h1 className="h-5h mb-4 w-30w text-end text-white font-normal text-1.5vh ">
          Powered By OpenAI
        </h1>
        <h1 className="h-fit w-60w text-white mb-2 font-bold text-4vh ">
          Supercharge your Creativity and Productivity
        </h1>
        <h1 className="h-fit w-60w text-white  font-medium text-2.5vh mb-4">
          Chat to start writting, Planning Learning and more with Insight AI .
        </h1>
        <div className="w-60w">
          <GoogleButton
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="h-full w-50w "></div>
    </div>
  );
};

export default HeroSection;
