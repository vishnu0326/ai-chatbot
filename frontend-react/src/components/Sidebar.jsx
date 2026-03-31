function Sidebar({ chats, currentChat, setCurrentChat, newChat, deleteChat }) {
  return (
    <div className="sidebar">
      <button className="new-chat" onClick={newChat}>
        + New Chat
      </button>

      {chats.map((chat, index) => (
        <div
          key={index}
          className={`chat-item ${index === currentChat ? "active" : ""}`}
          onClick={() => setCurrentChat(index)}
        >
          <span>
            {chat[0]?.text?.slice(0, 20) || "New Chat"}
          </span>

          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteChat(index);
            }}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;