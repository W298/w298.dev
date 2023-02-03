import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import "../styles/github-markdown.css";

export function PostComponent({ children }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkToc]}
        children={children}
      />
    </div>
  );
}
