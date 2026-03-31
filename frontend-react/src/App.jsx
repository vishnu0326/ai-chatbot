import { useState, useEffect, useRef } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import InputArea from "./components/InputArea";

function App() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [[]];
  });

  const [currentChat, setCurrentChat] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef(null);
  const abortRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const simulateStreaming = (text, callback, done) => {
    let i = 0;
    let current = "";

    const interval = setInterval(() => {
      current += text[i];
      i++;
      callback(current);

      if (i >= text.length) {
        clearInterval(interval);
        done();
      }
    }, 10);

    return () => clearInterval(interval);
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const newChats = [...chats];
    if (!newChats[currentChat]) newChats[currentChat] = [];

    newChats[currentChat].push({ text: input, type: "user" });
    newChats[currentChat].push({ text: "typing", type: "bot" });

    setChats(newChats);
    setInput("");
    setIsTyping(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const fullText = data.reply || "Error ❌";

      const stop = simulateStreaming(
        fullText,
        (partial) => {
          newChats[currentChat][newChats[currentChat].length - 1] = {
            text: partial,
            type: "bot",
          };
          setChats([...newChats]);
        },
        () => setIsTyping(false)
      );

      abortRef.current.stop = stop;

    } catch {
      setIsTyping(false);
    }
  };

  const stopResponse = () => {
    abortRef.current?.abort();
    abortRef.current?.stop?.();
    setIsTyping(false);
  };

  const newChat = () => {
    setChats([...chats, []]);
    setCurrentChat(chats.length);
  };

  // 🔥 DELETE CHAT
  const deleteChat = (index) => {
    if (!window.confirm("Delete this chat?")) return;

    const updated = chats.filter((_, i) => i !== index);

    setChats(updated.length ? updated : [[]]);
    setCurrentChat(0);
  };

  // 🎤 VOICE INPUT
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="app">

      <Sidebar
        chats={chats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        newChat={newChat}
        deleteChat={deleteChat}
      />

      <div className="main">
        <ChatBox
          chats={chats}
          currentChat={currentChat}
          chatEndRef={chatEndRef}
        />

        <InputArea
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          stopResponse={stopResponse}
          isTyping={isTyping}
          startListening={startListening}
          isListening={isListening}
        />
      </div>

    </div>
  );
}

export default App;