import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export const CodeBlock: CodeComponent = (
  { inline, className, children, ...props },
) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match
    ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    )
    : (
      <code className={className} {...props}>
        {children}
      </code>
    );
};
