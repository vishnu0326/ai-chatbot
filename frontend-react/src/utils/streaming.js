export const simulateStreaming = (text, onUpdate, onDone) => {
  let i = 0;
  let current = "";

  const interval = setInterval(() => {
    current += text[i];
    i++;
    onUpdate(current);

    if (i >= text.length) {
      clearInterval(interval);
      onDone();
    }
  }, 10);

  return () => clearInterval(interval);
};