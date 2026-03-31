import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function Message({ msg }) {

  // 🔥 SAFETY CHECK
  if (!msg || !msg.text || !msg.type) return null;

  return (
    <div className={`message-row ${msg.type}`}>

      <div className="avatar">
        {msg.type === "user" ? "🧑" : "🤖"}
      </div>

      <div className={`message ${msg.type}`}>

        {msg.text === "typing" ? (
          <div className="typing">
            <span></span><span></span><span></span>
          </div>
        ) : (
          <ReactMarkdown
            components={{
              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                const codeText = String(children || "").replace(/\n$/, "");

                return !inline && match ? (
                  <div className="code-block">
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                    >
                      {codeText}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="inline-code">
                    {children}
                  </code>
                );
              },
            }}
          >
            {msg.text || ""}
          </ReactMarkdown>
        )}

      </div>
    </div>
  );
}

export default Message;