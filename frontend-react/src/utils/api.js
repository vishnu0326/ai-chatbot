export const sendToBackend = async (message, signal) => {
  const res = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify({ message }),
  });

  return res.json();
};