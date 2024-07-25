import GoogleButton from "react-google-button";
import "@/App.css";
import HeroImage from "../assets/woman-wearing-vr_1252x1252-transformed.png";

interface HeroSectionProps {
  handleGoogleSignIn: () => Promise<void>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleGoogleSignIn }) => {
  return (
    <div className="hero-section h-94h w-full flex lg:flex-row md:flex-col-reverse ">
      <div className="h-70h md:h-full w-full flex justify-center items-center flex-col ls:w-50w ">
        <h1 className="hero-section-text">Insight AI</h1>
        <h1 className="h-fit mb-4 -mt-8 w-80w text-end text-white font-normal text-1.5vh md:w-60w ">
          Powered By OpenAI
        </h1>
        <h1 className="hero-section-text3 h-fit w-80w mb-2 font-bold text-4vh md:w-60w">
          Supercharge your Creativity and Productivity
        </h1>
        <h1 className="h-fit w-80w md:w-60w text-white  font-medium text-2.5vh mb-4">
          Chat to start writting, Planning Learning and more with Insight AI .
        </h1>
        <div className="w-80w md:w-60w">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
      <div className="h-1/2 w-full lg:w-70w justify-center items-center hidden md:flex md:items-center lg:justify-normal lg:h-90h">
        <img
          className="h-full md:mt-12 lg:h-70h  "
          src={HeroImage}
          alt="girlpic"
        />
      </div>
    </div>
  );
};

export default HeroSection;
