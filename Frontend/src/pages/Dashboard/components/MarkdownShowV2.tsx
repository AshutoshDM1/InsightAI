import Markdown from "markdown-to-jsx";
import { createElement } from "react";

interface MarkdownShowV2Props {
  content: string;
}

export default function MarkdownShowV2({ content }: MarkdownShowV2Props) {
  return (
    <Markdown
      options={{
        createElement: (tag, props, children) => {
          // Add vertical spacing if a "p" is next to another tag
          if (tag === "h1") {
            return <h1 className="text-3xl font-bold text-purple-500">{children}</h1>;
          }
          if (tag === "h2") {
            return <h2 className="text-2xl font-bold text-indigo-500">{children}</h2>;
          }
          if (tag === "h3") {
            return <h3 className="text-xl font-bold text-orange-500">{children}</h3>;
          }
          if (tag === "strong") {
            return <strong className="text-yellow-500">{children}</strong>;
          }
          if (tag === "p") {
            // Add margin-y unless parent already manages it
            return <p className="leading-6">{children}</p>;
          }
          if (tag === "li") {
            // Add margin-y unless parent already manages it
            return <li className="leading-6">{children}</li>;
          }
          if (tag === "hr") {
            // Add margin-y unless parent already manages it
            return <hr className="leading-6 my-3">{children}</hr>;
          }
          // For all block-level elements (not inline), add a bit of vertical margin if you want,
          // but according to the prompt, only "p" gets spacing to visually separate from other tags.
          return createElement(tag, props, children);
        },
      }}
    >
      {content}
    </Markdown>
  );
}
