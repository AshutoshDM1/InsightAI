import { useGSAP } from "@gsap/react";
import css from "../style/deshboard.module.css";
import { useRef } from "react";
import gsap from "gsap";
import Markdown from "react-markdown";
gsap.registerPlugin(useGSAP);
interface AI_FunctionProps {
  Input: string;
  AIData: string;
}

const AI_Function: React.FC<AI_FunctionProps> = ({ Input, AIData }) => {
  if (!Input) {
    return null;
  }

  const textContainer = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (textContainer.current?.innerText) {
        let tl = gsap.timeline();

        const text = textContainer.current.innerText;
        textContainer.current.innerText = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.innerText = char;
          textContainer.current?.appendChild(span);
        });
        tl.from(textContainer.current.children, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
        });
      }
    },
    {
      dependencies: [AIData],
      scope: textContainer,
      revertOnUpdate: true,
    }
  );

  return (
    <div className={css.main}>
      <div className={css.container1}>
        <h1 className={css.input_title}>{Input}</h1>
      </div>
      <div className={css.container2}>
        <div className={css.ai_content}>
          <div ref={textContainer}>
            <Markdown className="text_AI">{AIData}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_Function;
