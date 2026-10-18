
import type { LLMCallRecord } from "./types.js";

export interface LLMExecutionResult {
  response: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

interface TrackOptions {
  prompt: string;
  execute: () => Promise<LLMExecutionResult>;
}

export async function track(
  options: TrackOptions
): Promise<LLMCallRecord> {
  const { prompt, execute } = options;

  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  try {
    const result = await execute();

    const record: LLMCallRecord = {
      prompt,
      response: result.response,
      model: result.model,
      latencyMs: Date.now() - startTime,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      totalTokens: result.totalTokens,
      timestamp,
      status: "success",
    };

    console.log("LLM Call Record:", record);

    return record;
  } catch (error) {
    const record: LLMCallRecord = {
      prompt,
      response: "",
      model: "unknown",
      latencyMs: Date.now() - startTime,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      timestamp,
      status: "error",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    };

    console.error("LLM Call Record:", record);

    return record;
  }
}
