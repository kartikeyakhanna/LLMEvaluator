
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askGemini } from "./gemini.js";
import { track } from "llm-evaluator-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Demo backend is running",
  });
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body ?? {};

  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({
      error: "Prompt is required",
    });
  }

  const record = await track({
    prompt,
    execute: () => askGemini(prompt),
  });

  console.log("LLM telemetry:", record);

  if (record.status === "error") {
    return res.status(500).json(record);
  }

  return res.json(record);
});

app.listen(3000, () => {
  console.log("Demo backend running on http://localhost:3000");
});
