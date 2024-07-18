import Navbar from "@/components/Navbar";
import css from "../style/signup.module.css";
import "../App.css";
import { useState } from "react";
import MiniCards from "@/components/MiniCards";
import { Button } from "@/components/ui/button";
import Input from "@/components/Inputs";

const Dashboard: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };
  const HandleSubmit = (): void => {
    console.log(input);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      HandleSubmit();
    }
  };

  const [cards] = useState<string[]>([
    "Help me find the latest trends.",
    "Settle a debate: how should you store bread?",
    "Come up with a complex word riddle, including hints.",
    "Brainstorm ideas for a mocktail given specific ingredients.",
  ]);

  return (
    <>
      <div className={`${css.signup_page} h-screen`}>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full h-40h md:h-50h lg:h-40h">
          <h1 className="hero-section-text2 md:text h-fit  text-7xl w-90w mt-28 md:mt-0 sm:mt-28 font-extrabold sm:w-90w md:w-full md:text-center ">
            Hello, Download Master
          </h1>
          <h1 className="text-gray-500 h-fit w-90w text-7xl font-bold md:w-fit">
            How can I help you
          </h1>
          <div className="h-60h w-full md:flex lg:w-80w xl:w-60w 2xl:w-50w flex-wrap justify-evenly gap-5 items-center hidden ">
            {cards.map((card, index) => {
              return <MiniCards text={card} key={index} />;
            })}
          </div>
        </div>
        <div className="flex items-end justify-center w-full h-50h md:h-40h lg:h-50h">
          <div className="flex w-90w items-center justify-center space-x-2 md:w-70w">
            <Input
              type="email"
              placeholder="Enter your Prompt here ..."
              name="input"
              value={input}
              onChange={HandleChange}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={HandleSubmit} type="submit">
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
