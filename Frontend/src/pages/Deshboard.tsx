import Navbar from "@/components/Navbar";
import css from "../style/deshboard.module.css";
import "../App.css";
import React from 'react';
import { useEffect, useRef, useState } from "react";
import MiniCards from "@/components/MiniCards";
import { Button } from "@/components/ui/button";
import Input from "@/components/Inputs";
import AI_Function from "@/components/AI_Function";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { inputState, queryState } from "@/state/atoms";
import { v4 as uuidv4 } from "uuid";
import { getAiInfo, getUserDataFromLocalStorage } from "@/services/api";

const Dashboard: React.FC = () => {
  const [input, setInput] = useRecoilState<string>(inputState);
  const [queryData, setQuery] = useRecoilStateLoadable<Query[]>(queryState);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSectionRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (queryData.state === "hasValue") {
      scrollToBottom();
    }
  }, [queryData]);

  interface Query {
    uid: string;
    UserInput: string;
    AIData: string;
  }

  const query = queryData.contents;
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };
  const HandleSubmit = async (): Promise<void> => {
    const newQuery = { uid: uuidv4(), UserInput: input, AIData: "" };
    if (input.trim()) {
      setQuery((prevQueryData) => {
        const updatedQuery = [...prevQueryData, newQuery];
        return updatedQuery;
      });
      setInput("");
    }

    try {
      const response = await getAiInfo({
        input: newQuery.UserInput,
        uid: newQuery.uid,
      });

      setQuery((prevQueryData) => {
        const updatedQuery = prevQueryData.map((query) => {
          if (query.uid === newQuery.uid) {
            return { ...query, AIData: response?.data.data };
          }
          return query;
        });
        return updatedQuery;
      });
    } catch (error) {
      console.error("Error fetching AI info:", error);
    }
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

  const CardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setInput(e.currentTarget.innerText);
  };

  if (queryData.state === "loading") {
    return (
      <>
        <div className={css.deshboard_page} >
          <div className={`min-h-screen flex flex-col items-center`}> 
          <Navbar />
          <h1>SOME THing WEnt Wrong</h1>
          </div>
        </div>
      </>
    );
  }

  const userdata = getUserDataFromLocalStorage();

  return (
    <>
      <div className={css.deshboard_page}>
        <div className={`min-h-screen flex flex-col items-center`}>
          <Navbar />
          <div className="flex flex-col items-center justify-center w-full h-40h md:h-50h lg:h-40h">
            <h1 className="hero-section-text2 md:text h-fit  text-4xl md:text-7xl w-90w mt-16 md:mt-8 sm:mt-28 font-extrabold sm:w-90w md:w-full md:text-center ">
              {` Hello ! ${userdata?.displayName}`}
            </h1>
            <h1 className="text-gray-500 h-fit w-90w text-4xl md:text-7xl font-bold md:w-fit">
              How can I help you
            </h1>
            <div className="h-30h w-full mt-24 md:flex lg:w-80w xl:w-60w 2xl:w-50w flex-wrap justify-evenly gap-5 items-center hidden ">
              {cards.map((card, index) => {
                return (
                  <MiniCards text={card} key={index} onClick={CardClick} />
                );
              })}
            </div>
          </div>
          <div
            className={`mb-44 ${css.deshboard_page} mt-24 flex flex-col items-center justify-center w-95w xl:w-60w`}
          >
            <div className="w-full" ref={chatSectionRef}>
              {query &&
                query.map((queryItem: any, index: number) => {
                  return (
                    <AI_Function
                      key={index}
                      Input={queryItem.UserInput}
                      AIData={queryItem.AIData}
                    />
                  );
                })}
              <div ref={chatEndRef} />
            </div>
            <div
              className={` flex w-full items-center justify-center fixed bottom-0 px-2 pb-24 md:pb-8  space-x-2  backdrop-filter backdrop-blur`}
            >
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
      </div>
    </>
  );
};

export default Dashboard;
