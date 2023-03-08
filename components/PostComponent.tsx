"use client";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import "../styles/github-markdown.css";
import "../styles/custom-syntax.css";

function CodeBlock({ language, inline, children }) {
  return inline ? (
    <span className="bg-layer-300 px-2 mx-0.5 rounded font-mono">
      {children}
    </span>
  ) : (
    <SyntaxHighlighter
      language={language?.split("-")[1] ?? ""}
      style={atomOneDark}
      customStyle={{
        backgroundColor: "transparent",
        fontSize: "15px",
      }}
      showLineNumbers
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function PostComponent({ children }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={{
          code: ({ className, inline, children }) => (
            <CodeBlock language={className} inline={inline}>
              {children}
            </CodeBlock>
          ),
        }}
        remarkPlugins={[remarkGfm, remarkToc]}
        children={children}
      />
    </div>
  );
}
