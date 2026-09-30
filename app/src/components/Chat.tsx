import { useState } from "react";

interface ChatProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

function Chat({ onSubmit, loading }: ChatProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim() || loading) return;

    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <div className="chat">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Ask the LLM something..."
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}

export default Chat;