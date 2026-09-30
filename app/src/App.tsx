import { useState } from "react";
import Chat from "./components/Chat";
import Response from "./components/Response";
import "./App.css";

function App() 
{
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePrompt = async (prompt: string) => {
    setLoading(true);
    const result = await import("./services/llm").then((module) =>
    module.askLLM(prompt)
    );

    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>LLM Demo App</h1>
      <Chat onSubmit={handlePrompt} loading={loading} />
      <Response response={response} />
    </div>
  );
}

export default App;