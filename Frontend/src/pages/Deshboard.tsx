import Navbar from "@/components/Navbar";
import css from "../style/signup.module.css";
import "../App.css";
import { useState } from "react";
import MiniCards from "@/components/MiniCards";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const Deshboard: React.FC = () => {
  type Cards = string[];
  const [cards] = useState<Cards>([
    "Help me find the lastest trends.",
    "Settle a debate: how should you store bread?",
    "Come up with a complex word riddle, including hints.",
    "Brainstorm ideas for a mocktail given specific ingredients.",
  ]);

  return (
    <>
      <div className={`${css.signup_page} h-screen `}>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full h-40h ">
          <h1 className="hero-section-text2 h-fit w-fit text-7xl font-extrabold">
            Hello, Download Master
          </h1>
          <h1 className="text-gray-500 h-fit w-fit text-7xl font-bold">
            How can I help you
          </h1>
          <div className="h-60h w-full flex gap-10 justify-center items-center ">
            {cards.map((card, index) => {
              return <MiniCards text={card} key={index} />;
            })}
          </div>
        </div>
        <div className="flex items-end justify-center w-full h-50h">
          <div className="flex w-70w items-center space-x-2">
            <Input type="email" placeholder="Enter your query?........" />
            <Button type="submit">Send</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Deshboard;
