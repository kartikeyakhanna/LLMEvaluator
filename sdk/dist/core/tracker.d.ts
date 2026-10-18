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
export declare function track(options: TrackOptions): Promise<LLMCallRecord>;
export {};
