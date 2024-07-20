import { useGSAP } from "@gsap/react";
import css from "../style/deshboard.module.css";
import { useRef } from "react";
import gsap from "gsap";
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
      
      if (textContainer.current) {
        const textContent = AIData;
        textContainer.current.innerHTML = textContent
          .split("")
          .map((char) => `<span class="text_AI" >${char}</span>`)
          .join("");

        const chars = textContainer.current.querySelectorAll("span");

        gsap.fromTo(
          chars,
          {
            scale: 0,
            opacity : 0 ,
            rotate: 0,
          },
          {
            duration: .1, 
            opacity : 1 ,
            scale: 1,
            rotate: 360,
            stagger: 0.012,
          }
        );
        
      }
    },
    { dependencies: [AIData], scope: textContainer, revertOnUpdate: true }
  );

  return (
    <div className={css.main}>
      <div className={css.container1}>
        <h1 className={css.input_title}>{Input}</h1>
      </div>
      <div className={css.container2}>
        <div ref={textContainer} className={css.ai_content} />
      </div>
    </div>
  );
};

export default AI_Function;
