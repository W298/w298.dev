"use client";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";

import "../styles/github-markdown.css";
import "../styles/custom-syntax.css";
import "../styles/github-markdown-mobile.css";
import ImageLoading from "./ImageLoading";
import React from "react";

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
    <div className="markdown-body pb-[20vh] max-w-[70rem]">
      <ReactMarkdown
        components={{
          p: ({ children }) => <div className="mb-[16px]">{children}</div>,
          code: ({ className, inline, children }) => (
            <CodeBlock language={className} inline={inline}>
              {children}
            </CodeBlock>
          ),
          img: ({ alt = "600px", src }) => (
            <ImageLoading
              src={src}
              alt={src}
              loading="lazy"
              quality={100}
              unoptimized={true}
              width={alt}
              height={alt}
              className="my-2 rounded"
            />
          ),
        }}
        remarkPlugins={[remarkGfm, remarkToc]}
        rehypePlugins={[rehypeRaw]}
        children={children}
      />
    </div>
  );
}
