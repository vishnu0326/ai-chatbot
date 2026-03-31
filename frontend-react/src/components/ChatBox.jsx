import Message from "./Message";

function ChatBox({ chats, currentChat, chatEndRef }) {
  const current = chats[currentChat] || [];

  return (
    <div className="chat-box">

      {current.length === 0 && (
        <div className="welcome">
          <h2>Welcome Vishnu 👋</h2>
          <p>Ask anything to get started...</p>
        </div>
      )}

      {current.map((msg, i) =>
        msg ? <Message key={i} msg={msg} /> : null
      )}

      <div ref={chatEndRef}></div>
    </div>
  );
}

export default ChatBox;