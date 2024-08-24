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
        margin: "-0.5rem 0 -0.5rem 0",
      }}
      showLineNumbers
    >
      {children}
    </SyntaxHighlighter>
  );
}

export function PostComponent({ children }) {
  return (
    <div className="markdown-body pb-[20vh] min-[1350px]:w-[60rem]">
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
              isCenter={true}
            />
          ),
          video: ({ width, muted, controls, playsInline, children }) => (
            <div className="w-full flex justify-center">
              <video
                width={width}
                muted={muted}
                controls={controls}
                playsInline={playsInline}
                className="my-2"
              >
                {children}
              </video>
            </div>
          ),
          table: ({ children }) => (
            <div className="w-full flex justify-center">
              <table>{children}</table>
            </div>
          ),
        }}
        remarkPlugins={[remarkGfm, remarkToc]}
        rehypePlugins={[rehypeRaw]}
        children={children}
      />
    </div>
  );
}
