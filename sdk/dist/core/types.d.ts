export interface LLMCallRecord {
    prompt: string;
    response: string;
    model: string;
    latencyMs: number;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    timestamp: string;
    status: "success" | "error";
    error?: string;
}
