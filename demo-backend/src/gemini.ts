import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const model = "gemini-3.7-flash";

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

export interface GeminiResult {
  response: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export async function askGemini(
  prompt: string
): Promise<GeminiResult> {
  const result = await ai.models.generateContent({
    model: model,
    contents: prompt,
  });

  const usage = result.usageMetadata;

  return {
    response: result.text ?? "",
    model: model,
    inputTokens: usage?.promptTokenCount ?? 0,
    outputTokens: usage?.candidatesTokenCount ?? 0,
    totalTokens: usage?.totalTokenCount ?? 0,
  };
}