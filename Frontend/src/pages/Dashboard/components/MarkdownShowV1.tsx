import ReactMarkdown from "react-markdown";

interface MarkdownShowV1Props {
  content: string;
}

export default function MarkdownShowV1({ content }: MarkdownShowV1Props) {
  return (
    <ReactMarkdown
      components={{
        code: (props) => {
          const { className, children, ...rest } = props;
          return <code className={className} {...rest}>{children}</code>;
        },
        pre: (props) => {
          const { children, ...rest } = props;
          return <pre {...rest}>{children}</pre>;
        },
        p: (props) => {
          const { children, ...rest } = props;
          return <p {...rest}>{children}</p>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
