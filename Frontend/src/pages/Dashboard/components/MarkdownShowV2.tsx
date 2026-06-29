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
          if (tag === "h1") {
            return <h1 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h1>;
          }
          if (tag === "h2") {
            return <h2 className="text-xl font-bold text-white mt-5 mb-2.5">{children}</h2>;
          }
          if (tag === "h3") {
            return <h3 className="text-lg font-bold text-white mt-4 mb-2">{children}</h3>;
          }
          if (tag === "strong") {
            return <strong className="font-semibold text-white">{children}</strong>;
          }
          if (tag === "p") {
            return <p className="leading-7 my-3 text-neutral-200">{children}</p>;
          }
          if (tag === "ul") {
            return <ul className="list-disc pl-6 my-3 space-y-2 text-neutral-200">{children}</ul>;
          }
          if (tag === "ol") {
            return <ol className="list-decimal pl-6 my-3 space-y-2 text-neutral-200">{children}</ol>;
          }
          if (tag === "li") {
            return <li className="leading-7 text-neutral-200">{children}</li>;
          }
          if (tag === "hr") {
            return <hr className="border-neutral-700 my-6" />;
          }
          if (tag === "code") {
            return <code className="bg-neutral-800 text-neutral-100 rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>;
          }
          if (tag === "pre") {
            return <pre className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 overflow-x-auto my-4 font-mono text-sm">{children}</pre>;
          }
          return createElement(tag, props, children);
        },
      }}
    >
      {content}
    </Markdown>
  );
}
