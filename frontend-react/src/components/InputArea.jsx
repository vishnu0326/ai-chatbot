import { useRef, useState } from "react";

function InputArea({
  input,
  setInput,
  sendMessage,
  stopResponse,
  isTyping,
  startListening,
  isListening,
}) {
  const fileRef = useRef(null);
  const cameraRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleFileSelect = (type) => {
    setShowMenu(false);

    if (type === "file") fileRef.current.click();
    if (type === "camera") cameraRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="input-area">

      {/* 📎 BUTTON */}
      <button onClick={() => setShowMenu(!showMenu)}>📎</button>

      {/* 🔽 POPUP MENU */}
      {showMenu && (
        <div className="upload-menu">
          <div onClick={() => handleFileSelect("camera")}>
            📷 Camera
          </div>
          <div onClick={() => handleFileSelect("file")}>
            📄 Documents
          </div>
          <div onClick={() => handleFileSelect("file")}>
            🖼️ Photos
          </div>
        </div>
      )}

      {/* HIDDEN INPUTS */}
      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* 🎤 VOICE */}
      <button onClick={startListening}>
        {isListening ? "🎙️..." : "🎤"}
      </button>

      {/* INPUT AREA */}
      <div className="input-wrapper">
        {fileName && (
          <div className="file-preview">
            📄 {fileName}
          </div>
        )}

        <input
          value={input}
          disabled={isTyping}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>

      {/* SEND / STOP */}
      {isTyping ? (
        <button onClick={stopResponse}>Stop</button>
      ) : (
        <button onClick={sendMessage}>Send</button>
      )}

    </div>
  );
}

export default InputArea;