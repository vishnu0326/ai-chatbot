# 🤖 AI Chatbot (React + Python Backend)

An AI-powered chatbot application built using **React (Frontend)** and a **Python backend API**, featuring real-time streaming responses, markdown rendering, and code highlighting.

---

## 🚀 Features

* 💬 Multi-chat support (like ChatGPT)
* ⚡ Streaming response effect (typing animation)
* 🧠 AI-powered responses via backend API
* 📝 Markdown rendering (headings, lists, etc.)
* 💻 Code syntax highlighting (Prism)
* 📋 Copy-to-clipboard for code blocks
* 💾 Chat history stored in localStorage
* 🎯 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend:

* React (Vite)
* CSS
* react-markdown
* react-syntax-highlighter

### Backend:

* Python (FastAPI / Flask)
* AI API (OpenAI / OpenRouter)

---

## 📂 Project Structure

```
frontend-react/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/ai-chatbot.git
cd ai-chatbot/frontend-react
```

---

### 2️⃣ Install dependencies

```
npm install
```

---

### 3️⃣ Start the frontend

```
npm run dev
```

---

### 4️⃣ Start the backend

cd ai-chatbot/bacend

command:uvicorn app:app --reload

Make sure your backend server is running at:

```
http://127.0.0.1:8000/chat
```

---

## 🔌 API Format

The frontend expects:

**POST** `/chat`

Request:

```
{
  "message": "Your question"
}
```

Response:

```
{
  "reply": "AI generated response"
}
```

---

## 🎯 Key Highlights

* Simulates real-time AI streaming responses
* Supports rich text formatting using Markdown
* Handles code snippets with syntax highlighting
* Designed for scalability and easy integration with AI APIs

---

## 📸 Future Improvements

* 🌐 Deploy frontend (Vercel / Netlify)
* ☁️ Deploy backend (Render / Railway)
* 🔐 Add authentication
* 🎙️ Voice input support
* 🧠 Memory-based conversations

---

## 🙌 Author

**Vishnu Teja**

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
