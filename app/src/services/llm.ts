export interface LLMCallRecord {
  prompt: string;
  response?: string;
  model: string;
  latencyMs: number;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  timestamp: string;
  status: "success" | "error";
  error?: string;
}

export async function sendMessage(
  prompt: string
): Promise<LLMCallRecord> {
  const result = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.error ?? data.errorMessage ?? "LLM request failed");
  }

  return data as LLMCallRecord;
}
