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

  try {
    const result = await import("./services/llm").then((module) =>
      module.sendMessage(prompt)
    );

    setResponse(result.response ?? "");
    console.log("LLM telemetry:", result);
  } catch (error) {
    console.error("Failed to get LLM response:", error);
    setResponse("Failed to generate a response. Please try again.");
  } finally {
    setLoading(false);
  }
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